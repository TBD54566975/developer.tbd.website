const path = require("path");
const NodeResolver = require("jest-resolve");

module.exports = (request, options) => {
  if (request === "@ipld/dag-cbor") {
    console.log(
      "resolving @ipld/dag-cbor",
      "node_modules/@ipld/dag-cbor/src/index.js"
    );
    return path.resolve(
      process.cwd(),
      "node_modules/@ipld/dag-cbor/src/index.js"
    );
  }

  return NodeResolver.findNodeModule(request, options);
};
