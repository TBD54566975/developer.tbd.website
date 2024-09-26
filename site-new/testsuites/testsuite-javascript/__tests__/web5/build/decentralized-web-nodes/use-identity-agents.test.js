import { test, expect, describe } from "vitest";
import { setUpIdentityManager } from "../../../setup-web5";

let agent;

async function getDwnEndpoints() {
  // :snippet-start: createDidOptions
  // selects DWN endpoints that are provided by default during the Web5 tech preview period
  const serviceEndpointNodes = ["https://dwn.tbddev.org/beta"];

  // generates key pairs used for authorization and encryption when interfacing with DWNs
  const didOptions = {
    services: [
      {
        id: "#dwn",
        type: "DecentralizedWebNode",
        serviceEndpoint: serviceEndpointNodes,
      },
    ],
  };
  return didOptions;
  // :snippet-end:
}

describe("create identity agent", () => {
  test("createIdentityAgent", async () => {
    agent = await setUpIdentityManager();
  });
  test("createDidOptions returns an object with service endpoints", async () => {
    const didOptions = await getDwnEndpoints();

    expect(didOptions).toHaveProperty("services");
    expect(Array.isArray(didOptions.services)).toBe(true);
    didOptions.services.forEach((service) => {
      expect(service).toHaveProperty("id");
      expect(service).toHaveProperty("serviceEndpoint");
      expect(service).toHaveProperty("type");
      expect(service.type).toBe("DecentralizedWebNode");
    });
  });
});
