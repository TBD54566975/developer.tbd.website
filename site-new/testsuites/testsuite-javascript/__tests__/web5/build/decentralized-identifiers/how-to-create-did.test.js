import { test, expect, vi, describe, beforeAll } from "vitest";
import { DidDht, DidJwk, DidDhtMethod } from "@web5/dids";
import { setUpWeb5 } from "../../../setup-web5";
import { Web5 } from "@web5/api";

let web5;
let did;

describe("how-to-create-did", () => {
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
    did = globalThis.did;

    vi.mock("@web5/api", () => {
      return {
        Web5: {
          connect: vi.fn(() => {
            return {
              web5,
              did,
            };
          }),
        },
      };
    });
  });

  test("show required imports to create did", async () => {
    const requiredImports = `
   // :snippet-start: requiredDidImports
// did:dht
import { DidDht } from '@web5/dids'

//did:jwk
import { DidJwk } from '@web5/dids'

      // :snippet-end:
    `;
  });

  async function createDidAutomatically() {
    // :snippet-start: createDidAutomatically
    const { did: userDid } = await Web5.connect();
    return userDid;
    // :snippet-end:
  }

  test("createDidAutomatically returns a DID", async () => {
    const did = await createDidAutomatically();
    expect(did).toBeDefined();
    expect(did).toMatch(/^did:/);
  });

  test("createDidDht creates a DID with did:dht method", async () => {
    // :snippet-start: createDidDht
    // Creates a DID using the DHT method and publishes the DID Document to the DHT
    const didDht = await DidDht.create({ publish: true });

    // DID and its associated data which can be exported and used in different contexts/apps
    const portableDid = didDht.export();

    // DID string
    const did = didDht.uri;

    // DID Document
    const didDocument = JSON.stringify(didDht.document);

    // :snippet-end:

    expect(did).toMatch(/^did:dht:/);
  });

  test("createDidJwk creates a DID with did:jwk method", async () => {
    // :snippet-start: createDidJwk
    //Creates a DID using the did:jwk method
    const didJwk = await DidJwk.create();

    //DID and its associated data which can be exported and used in different contexts/apps
    const portableDid = didJwk.export();

    //DID string
    const did = didJwk.uri;

    //DID Document
    const didDocument = JSON.stringify(didJwk.document);

    // :snippet-end:

    expect(did).toMatch(/^did:jwk:/);
  });
});
