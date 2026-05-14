# yac

Pipe `.http` file syntax to [httpyac](https://httpyac.github.io/) via stdin.

```sh
$ "GET https://httpbin.org/json" | node bin\yac.mjs

---------------------

GET https://httpbin.org/json
accept: */*
accept-encoding: gzip, deflate, br
user-agent: httpyac
HTTP/1.1 200  - OK
access-control-allow-credentials: true
access-control-allow-origin: *
connection: keep-alive
content-length: 429
content-type: application/json
date: Thu, 14 May 2026 10:31:02 GMT
server: gunicorn/19.9.0

{
  "slideshow": {
    "author": "Yours Truly",
    "date": "date of publication",
    "slides": [
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "items": [
          "Why <em>WonderWidgets</em> are great",
          "Who <em>buys</em> WonderWidgets"
        ],
        "title": "Overview",
        "type": "all"
      }
    ],
    "title": "Sample Slide Show"
  }
}
```

## Installation

Requires Node.js 18+. Install directly from GitHub:

```sh
npm install -g github:harvzor/yac
```

To uninstall:

```sh
npm uninstall -g yac
```

## Usage

### Interactive

Type `yac`, paste your request, then type `###` on its own line and press Enter to send:

```sh
$ yac
Paste your .http request, then type ### to send:
GET https://httpbin.org/json
###
```

### Piped

#### Bash

```bash
echo "GET https://httpbin.org/json" | yac
```

#### PowerShell
```powershell
"GET https://httpbin.org/json" | yac
```

#### Nushell

```nushell
"GET https://httpbin.org/json" | yac
```
## Output

Displays the full request/response exchange with syntax highlighting, matching httpyac's default output format.
