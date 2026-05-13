#!/usr/bin/env node

import { send, cli, store } from 'httpyac';

async function main() {
  // Read all of stdin
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  const input = Buffer.concat(chunks).toString('utf8').trim();

  if (!input) {
    process.stderr.write('Usage: echo "GET https://example.com" | yac\n');
    process.exit(1);
  }

  // Bootstrap httpyac IO layer
  cli.initFileProvider();

  const httpFileStore = new store.HttpFileStore();
  const httpFile = await httpFileStore.parse('stdin.http', input, {});

  let captured = null;

  const success = await send({
    httpFile,
    logResponse: async (response) => {
      captured = response;
    },
  });

  if (!captured) {
    process.stderr.write('No response captured\n');
    process.exit(1);
  }

  // Status line
  const version = captured.httpVersion ?? '1.1';
  const status = captured.statusCode;
  const message = captured.statusMessage ?? '';
  process.stdout.write(`HTTP/${version} ${status} ${message}\n`);

  // Headers
  if (captured.headers) {
    for (const [key, value] of Object.entries(captured.headers)) {
      process.stdout.write(`${key}: ${value}\n`);
    }
  }

  // Blank line
  process.stdout.write('\n');

  // Body
  if (captured.prettyPrintBody != null) {
    process.stdout.write(String(captured.prettyPrintBody));
  } else if (captured.body != null) {
    const body = typeof captured.body === 'string'
      ? captured.body
      : JSON.stringify(captured.body, null, 2);
    process.stdout.write(body);
  } else if (captured.rawBody != null) {
    process.stdout.write(captured.rawBody.toString('utf8'));
  }

  process.stdout.write('\n');
  process.exit(success ? 0 : 1);
}

main().catch((err) => {
  process.stderr.write(`Error: ${err.message}\n`);
  process.exit(1);
});
