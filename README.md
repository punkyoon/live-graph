# live-graph

Super-simple live sensor graph built on **FaseAPI**, **Socket.IO** and **Chart.js**.

## Requirements

- Python 3.14+
- [uv](https://docs.astral.sh/uv/)

## Getting Started

```bash
# Install Python 3.14 and dependencies into .venv
$ uv sync

# Start the FastAPI server with reload on http://localhost:8000
$ uv run live-graph
```

Open `http://localhost:8000` and click **start** to begin receiving live data.

### Try it out

In a separate terminal:

```bash
$ uv run python samples/client_test.py --channel <channel-name>
# Example: uv run python samples/client_test.py --channel orange-cat
```

This emits a random `walk` payload every 500 ms via the Socket.IO async client.

### Lint & Format

```bash
$ uv run ruff check
$ uv run ruff format

$ uv run basedpyright
```
