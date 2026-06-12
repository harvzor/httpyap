# httpyap

Pipe `.http` file syntax to [httpyac](https://httpyac.github.io/) via stdin.

![demo](.github/demo.gif)

## Installation

Requires Node.js 18+. Install directly from GitHub:

```sh
npm install -g github:harvzor/httpyap
```

To uninstall:

```sh
npm uninstall -g httpyap
```

## Usage

### Interactive

Type `yap`, paste your request, then type `###` on its own line and press Enter to send:

```sh
$ yap
Paste your .http request, then type ### to send:
GET https://httpbin.org/json
###
```

### Piped

#### Bash

```bash
echo "GET https://httpbin.org/json" | yap
```

Multiline:

```bash
yap << 'EOF'
POST https://httpbin.org/post
Content-Type: application/json

{
  "foo": "bar"
}
EOF
```

#### Zsh

```zsh
echo "GET https://httpbin.org/json" | yap
```

Multiline:

```zsh
yap << 'EOF'
POST https://httpbin.org/post
Content-Type: application/json

{
  "foo": "bar"
}
EOF
```

#### PowerShell

```powershell
"GET https://httpbin.org/json" | yap
```

Multiline:

```powershell
@"
POST https://httpbin.org/post
Content-Type: application/json

{
  "foo": "bar"
}
"@ | yap
```

#### Nushell

```nushell
"GET https://httpbin.org/json" | yap
```

Multiline:

```nushell
'POST https://httpbin.org/post
Content-Type: application/json

{
  "foo": "bar"
}' | yap
```

## Using variables

### Via .env files

Yac supports `.env` files via httpyac's variable resolution. Place a `.env` file in the working directory and reference variables using `{{name}}` syntax in your request:

```ini
# .env
token=my-secret-token
baseUrl=https://httpbin.org
```

```powershell
@"
GET {{baseUrl}}/json
Authorization: Bearer {{token}}
"@ | yap
```

### Inline variables

Variables can be defined inline in the request using `@name = value`:

```powershell
@"
@token = my-secret-token

GET https://httpbin.org/json
Authorization: Bearer {{token}}
"@ | yap
```

## Output

Displays the full request/response exchange with syntax highlighting, matching httpyac's default output format.

