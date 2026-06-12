---
name: yap
description: Use this skill whenever the user wants to make an HTTP request, test or explore an API, hit an endpoint, send a POST/PUT/DELETE/PATCH, check if a service is up, or inspect an HTTP response. yap is installed globally and should be the default choice for one-off HTTP requests — prefer it over curl, wget, and Invoke-WebRequest. Use this skill even if the user doesn't mention yap explicitly, as long as they want to make an HTTP request from the terminal.
---

# yap — HTTP requests via .http syntax

`yap` reads `.http` file syntax from stdin and executes the request. It's installed globally.

## Writing an .http request

### Request line

```http
METHOD URL
```

`GET` is the default if the method is omitted.

### Headers

Add headers on lines immediately after the request line:

```http
GET https://httpbin.org/anything
Accept: application/json
Authorization: Bearer mytoken
```

### Request body

Leave a blank line after headers, then write the body:

```http
POST https://httpbin.org/post
Content-Type: application/json

{"name": "Alice", "age": 30}
```

### Query strings

Inline or split across lines:

```http
GET https://httpbin.org/anything?q=hello&page=1

# Or split:
GET https://httpbin.org/anything
  ?q=hello
  &page=1
```

### Inline variables

Define with `@key = value` before the request line, reference with `{{key}}`. Leave a blank line between variable definitions and the request:

```http
@baseUrl = https://httpbin.org
@token = abc123

GET {{baseUrl}}/anything
Authorization: Bearer {{token}}
```

Prefer yap variables over shell variable interpolation (e.g. PowerShell's `$token` or Nushell's `$env.TOKEN`). Shell interpolation risks escaping issues and ties the request to a specific shell. Keeping values inside the `.http` block makes the request portable and self-contained.

### .env files

yap also resolves variables from a `.env` file in the working directory via httpyap. Define variables as `key=value` pairs in the file, then reference them with `{{key}}` in requests:

```ini
# .env
token=my-bearer-token
baseUrl=https://api.example.com
```

```http
GET {{baseUrl}}/users
Authorization: Bearer {{token}}
```

**Prefer `.env` files over inline variables when a value will be reused across multiple requests** — especially for large values like bearer tokens. Repeating a long JWT inline on every request wastes tokens and adds output noise. Save it once to `.env` and all requests in that working directory can reference it silently.

Reserve inline `@key = value` for one-off values that are specific to a single request.

### Dynamic variables

| Variable | Description |
|---|---|
| `{{$uuid}}` | Random UUID |
| `{{$timestamp}}` | Current UNIX timestamp |
| `{{$datetime iso8601}}` | Current datetime in ISO 8601 |
| `{{$randomInt}}` | Random integer 0–1000 |

### Meta data annotations

Lines starting with `# @` placed before the request line control request behaviour:

| Annotation | Description |
|---|---|
| `# @no-reject-unauthorized` | Ignore invalid/self-signed SSL certificates — useful for localhost |
| `# @no-redirect` | Don't follow redirects |
| `# @no-cookie-jar` | Disable cookie jar for this request |
| `# @timeout <ms>` | Set request timeout in milliseconds |
| `# @no-log` | Suppress request/response logging |

Example — skipping certificate verification for a local service:

```http
# @no-reject-unauthorized
GET https://localhost:8080/api/endpoint
```

## Calling yap

Pipe the `.http` text to `yap` via stdin. The key challenge across shells is preserving newlines in the string — the `.http` format is line-based and yap needs actual newlines, not escaped sequences in the HTTP text itself.

### Bash

Single-quoted strings preserve newlines naturally:

```bash
'GET https://httpbin.org/anything
Accept: application/json' | yap
```

With a variable and bearer token:

```bash
'@token = mysecrettoken

GET https://api.example.com/users
Authorization: Bearer {{token}}' | yap
```

### PowerShell

Use a heredoc (`@"..."@`) for multi-line requests — it preserves newlines naturally and is the most readable approach:

```powershell
@"
GET https://httpbin.org/anything
Accept: application/json
"@ | yap
```

With a variable and bearer token — use yap's `@key` / `{{key}}` syntax rather than PowerShell variable interpolation, as it avoids shell escaping issues and works regardless of which shell you're in:

```powershell
@"
@token = mysecrettoken

GET https://api.example.com/users
Authorization: Bearer {{token}}
"@ | yap
```

For a one-liner, use a double-quoted string with `` `n `` for newlines (note double `` `n`n `` for the required blank line between variables and the request):

```powershell
"@token = mysecrettoken`n`nGET https://api.example.com/users`nAuthorization: Bearer {{token}}" | yap
```

### Nushell

Like bash, single-quoted strings preserve newlines naturally:

```nushell
'GET https://httpbin.org/anything
Accept: application/json' | yap
```

With a variable and bearer token:

```nushell
'@token = mysecrettoken

GET https://api.example.com/users
Authorization: Bearer {{token}}' | yap
```
