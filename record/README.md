# Recording a demo

Requires Docker.

## Build

From the repo root:

```sh
docker build -t vhs-yac -f record/Dockerfile .
```

## Render

```sh
docker run --rm -v $"(pwd):/vhs" vhs-yac record/yac.tape
```

The GIF will be saved as `demo.gif` in the current directory. Copy it to `.github/demo.gif` to update the README demo.
