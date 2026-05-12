import logging
from pathlib import Path
from typing import Any

import socketio
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)

logger = logging.getLogger("live_graph")

BASE_DIR = Path(__file__).resolve().parent


sio_server: socketio.AsyncServer = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins="*")
app = FastAPI(title="Live Graph Service")
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=BASE_DIR / "templates")


@app.get("/", response_class=HTMLResponse)
async def index(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request, "index.html")


def _other_rooms(sid: str) -> list[str]:
    return [room for room in sio_server.rooms(sid) if room != sid]


@sio_server.on("join channel")  # pyright: ignore[reportOptionalCall]
async def join_channel(sid: str, data: dict[str, Any]) -> None:
    channel = str(data.get("channel") or "").strip()
    if not channel:
        await sio_server.emit("channel error", {"message": "channel name is required"}, to=sid)
        return

    for old in _other_rooms(sid):
        await sio_server.leave_room(sid, old)

    await sio_server.enter_room(sid, channel)
    await sio_server.emit("joined", {"channel": channel}, to=sid)

    logger.info("[%s] joined '%s'", sid, channel)


@sio_server.on("leave channel")  # pyright: ignore[reportOptionalCall]
async def leave_channel(sid: str, data: dict[str, Any]) -> None:
    channel = str(data.get("channel") or "").strip()
    if channel:
        await sio_server.leave_room(sid, channel)
        logger.info("[%s] left '%s'", sid, channel)


@sio_server.on("walk")  # pyright: ignore[reportOptionalCall]
async def handle_walk_event(sid: str, data: dict[str, Any]) -> None:
    channel = str(data.get("channel") or "").strip()
    if not channel:
        return

    payload = {k: v for k, v in data.items() if k != "channel"}
    logger.info("[%s] %s", channel, payload)

    await sio_server.emit("draw", payload, room=channel)


asgi = socketio.ASGIApp(sio_server, other_asgi_app=app)


def main() -> None:
    import uvicorn

    uvicorn.run(
        "live_graph.server:asgi",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )


if __name__ == "__main__":
    main()
