# yac

Pipe `.http` file syntax to [httpyac](https://httpyac.github.io/) via stdin.

![demo](.github/demo.gif)

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

Multiline:

```bash
yac << 'EOF'
POST https://httpbin.org/post
Content-Type: application/json

{
  "foo": "bar"
}
EOF
```

#### PowerShell

```powershell
"GET https://httpbin.org/json" | yac
```

Multiline:

```powershell
@"
POST https://httpbin.org/post
Content-Type: application/json

{
  "foo": "bar"
}
"@ | yac
```

#### Nushell

```nushell
"GET https://httpbin.org/json" | yac
```

Multiline:

```nushell
'POST https://httpbin.org/post
Content-Type: application/json

{
  "foo": "bar"
}' | yac
```
## Output

Displays the full request/response exchange with syntax highlighting, matching httpyac's default output format.
