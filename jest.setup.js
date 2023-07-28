const fakeIndexedDB = require("fake-indexeddb");

global.indexedDB = fakeIndexedDB.default;
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

global.self = global.self || {};

jest.setTimeout(10000);

Object.defineProperty(global.self, "crypto", {
  value: {
    subtle: {
      digest: jest.fn().mockResolvedValue(new Uint8Array([1, 2, 3, 4])),
    },
    getRandomValues: function (buffer) {
      let len = buffer.length;
      while (len--) {
        buffer[len] = Math.floor(Math.random() * 256);
      }
      return buffer;
    },
  },
  writable: true,
  configurable: true,
});

(async () => {
  const nodeFetch = await import("node-fetch");
  global.fetch = nodeFetch.default || nodeFetch;
})();
