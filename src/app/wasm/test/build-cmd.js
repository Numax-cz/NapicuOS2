exports.cmd =
  'emcc -Os src/app/wasm/test/console-logger.c -o src/assets/wasm/console-logger.js -s MODULARIZE=1 -s EXPORT_NAME="ConsoleLoggerModule"';
