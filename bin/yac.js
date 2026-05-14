#!/usr/bin/env node

import { createInterface } from 'readline';
import { send, cli, store, utils } from 'httpyac';

function readInteractiveInput() {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin });
    const lines = [];
    rl.on('line', (line) => {
      if (line.trimEnd() === '###') {
        rl.close();
      } else {
        lines.push(line);
      }
    });
    rl.on('close', () => resolve(lines.join('\n')));
  });
}

async function main() {
  let input;
  if (process.stdin.isTTY) {
    process.stderr.write('Paste your .http request, then type ### to send:\n');
    input = (await readInteractiveInput()).trim();
  } else {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    input = Buffer.concat(chunks).toString('utf8').trim();
  }

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
      requestOutput: true,
      requestHeaders: true,
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
