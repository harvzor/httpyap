# yac

Pipe `.http` file syntax to [httpyac](https://httpyac.github.io/) via stdin.

```
$ echo "GET https://httpbin.org/json" | yac

---------------------

GET https://httpbin.org/json
accept-encoding: gzip, deflate, br
accept: */*
user-agent: httpyac
HTTP/1.1 200  - OK
content-type: application/json
...
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

```
$ yac
Paste your .http request, then type ### to send:
GET https://httpbin.org/json
###
```

### Piped

**Bash**
```bash
echo "GET https://httpbin.org/json" | yac
```

**PowerShell**
```powershell
"GET https://httpbin.org/json" | yac
```

**Nushell**
```nushell
"GET https://httpbin.org/json" | yac
```
## Output

Displays the full request/response exchange with syntax highlighting, matching httpyac's default output format.
