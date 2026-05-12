import argparse
import asyncio
import logging
from random import randrange
from typing import Any

import socketio

SERVER_URL = "http://localhost:8000"
INTERVAL_SECONDS = 0.5

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)

logger = logging.getLogger("live_graph.samples.client_test")


async def run(channel: str) -> None:
    sio_client = socketio.AsyncClient()
    await sio_client.connect(SERVER_URL)

    try:
        while True:
            payload: dict[str, Any] = {
                "channel": channel,
                "e": randrange(10),
                "walk": randrange(50),
                "fast_walk": randrange(50),
                "walk_time": randrange(50),
                "fast_walk_time": randrange(50),
                "rest_time": randrange(50),
            }

            await sio_client.emit("walk", payload)
            logger.info("sent [%s]: %s", channel, payload)
            await asyncio.sleep(INTERVAL_SECONDS)
    finally:
        await sio_client.disconnect()


def main() -> None:
    parser = argparse.ArgumentParser(description="Super-simple live sensor graph client")
    parser.add_argument(
        "-c",
        "--channel",
        default="default",
        help="Channel name to publish into (default: %(default)s)",
    )
    args = parser.parse_args()

    try:
        asyncio.run(run(args.channel))
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
