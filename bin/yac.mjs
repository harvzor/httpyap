#!/usr/bin/env node

import { send, cli, store, utils } from 'httpyac';

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

  const logResponse = utils.requestLoggerFactory(
    (text) => process.stdout.write(text + '\n'),
    {
      responseHeaders: true,
      responseBodyPrettyPrint: true,
      responseBodyLength: 0,
    }
  );

  const success = await send({ httpFile, logResponse });
  process.exit(success ? 0 : 1);
}

main().catch((err) => {
  process.stderr.write(`Error: ${err.message}\n`);
  process.exit(1);
});
