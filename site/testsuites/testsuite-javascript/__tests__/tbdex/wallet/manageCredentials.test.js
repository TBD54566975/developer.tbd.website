import { test, expect, describe, beforeAll, afterAll } from 'vitest';
import { TbdexHttpClient, DevTools } from '@tbdex/http-client';
import { DidDht } from '@web5/dids';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { PresentationExchange } from '@web5/credentials';

describe('Wallet: Manage Credentials', () => {
  let pfi;
  let pfiDid; // The URI of the PFI's DID
  let server;
  let mockOffering;

  let vcJwtResidence =
    'eyJraWQiOiJkaWQ6ZGh0OnA5cW5idDRrd3lrenF6Znp5eXN0ZDY5Zjhnb3N0YnAzbmY3dGRyczRyd3FqaW16MWsxY3kjMCIsInR5cCI6IkpXVCIsImFsZyI6IkVkRFNBIn0.eyJpc3MiOiJkaWQ6ZGh0OnA5cW5idDRrd3lrenF6Znp5eXN0ZDY5Zjhnb3N0YnAzbmY3dGRyczRyd3FqaW16MWsxY3kiLCJzdWIiOiJkaWQ6ZGh0OnV1b3J6ZHRqOXgzYTM1OTNtZjlleXNxaHM0NWRrZXpqdzZqYXBkdWRjMXpicjc4aXNnZXkiLCJpYXQiOjE3MDc3NjM4NDgsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJSZXNpZGVuY2VDcmVkZW50aWFsIl0sImlkIjoidXJuOnV1aWQ6ODc5N2VkZDgtNzE2Mi00YTliLWEyMjgtNGRkZTA4NjFlNzZmIiwiaXNzdWVyIjoiZGlkOmRodDpwOXFuYnQ0a3d5a3pxemZ6eXlzdGQ2OWY4Z29zdGJwM25mN3RkcnM0cndxamltejFrMWN5IiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMi0xMlQxODo1MDo0OFoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpkaHQ6dXVvcnpkdGo5eDNhMzU5M21mOWV5c3FoczQ1ZGtlemp3NmphcGR1ZGMxemJyNzhpc2dleSIsImFkZHJlc3MiOiIxMCBPcmNoYXJkIHN0In19fQ.Uvq5jHJbhe7mcPXAMNtfBoD7yez6GXP0GYNuyiZI0_pyfK_mKPjrbkJPXd3LbOtYvB06XxY6tGLMTo7tiMRFDQ';
  let vcJwtSanctions =
    'eyJraWQiOiJkaWQ6ZGh0Onc4bThxNXFja21vZXRzaWlrajR3ZXFhYWRjeGtjNjFkNjh6cnk3aHBpZmdveXE4dG1zb28jMCIsInR5cCI6IkpXVCIsImFsZyI6IkVkRFNBIn0.eyJpc3MiOiJkaWQ6ZGh0Onc4bThxNXFja21vZXRzaWlrajR3ZXFhYWRjeGtjNjFkNjh6cnk3aHBpZmdveXE4dG1zb28iLCJzdWIiOiJkaWQ6ZGh0OmtkMzVlNmN4M3pueXp1ajR3ejF1ZmRjeGs4ODlzYXVrYXRhYWc3YmNrM2NwY2I3cGM4NW8iLCJpYXQiOjE3MDc0OTEzODcsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJTYW5jdGlvbnNDcmVkZW50aWFsIl0sImlkIjoidXJuOnV1aWQ6MGU4YWJhMWYtMmMwZS00MDhlLWIxOWMtZjY0NzZiYTU3NDVhIiwiaXNzdWVyIjoiZGlkOmRodDp3OG04cTVxY2ttb2V0c2lpa2o0d2VxYWFkY3hrYzYxZDY4enJ5N2hwaWZnb3lxOHRtc29vIiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMi0wOVQxNTowOTo0N1oiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpkaHQ6a2QzNWU2Y3gzem55enVqNHd6MXVmZGN4azg4OXNhdWthdGFhZzdiY2szY3BjYjdwYzg1byIsInN0YXR1cyI6ImFwcHJvdmVkIn19fQ.Wc-qV2L3Z5WJYvUYirznpDsyk1Ntcw0kt_bhuXZDqNVXAn-d9Wta67eta-yu7V1C1T74yv6pQaqjgf2rDLxCAg';

  const customPresentationDefinition = {
    id: 'custom-pd-id',
    input_descriptors: [
      {
        id: 'sanctionsVerification',
        purpose: 'Confirm the individual is not sanctioned',
        constraints: {
          fields: [
            {
              path: [
                '$.vc.credentialSubject.status',
                '$.credentialSubject.status',
              ],
              filter: {
                type: 'string',
                const: 'approved',
              },
            },
          ],
        },
      },
      {
        id: 'residenceVerification',
        purpose: "Confirm the individual's residence address",
        constraints: {
          fields: [
            {
              path: [
                '$.vc.credentialSubject.address',
                '$.credentialSubject.address',
              ],
              filter: {
                type: 'string',
                const: '10 Orchard st',
              },
            },
          ],
        },
      },
    ],
  };

  beforeAll(async () => {
    // Create a PFI DID
    pfi = await DidDht.create({
      options:{
        publish: true,
        services: [
          {
            id: 'pfi',
            type: 'PFI',
            serviceEndpoint: 'http://localhost:9000',
          },
        ]
      }
    });
    pfiDid = pfi.uri;

    // Mock an offering using customPresentationDefinition
    const defaultOfferingData = DevTools.createOfferingData();
    mockOffering = DevTools.createOffering({
      from: pfiDid,
      offeringData: {
        ...defaultOfferingData,
        payinCurrency: {
          ...defaultOfferingData.payinCurrency,
          currencyCode: 'USD',
        },
        payoutCurrency: {
          ...defaultOfferingData.payoutCurrency,
          currencyCode: 'KES',
        },
        requiredClaims: customPresentationDefinition,
      },
    });
    await mockOffering.sign(pfi);

    server = setupServer(
      http.get('http://localhost:9000/offerings', () => {
        return HttpResponse.json(
          { data: [mockOffering] },
          { status: 200 },
        );
      }),
    );
    server.listen({ onUnhandledRequest: 'bypass' });
  });

  afterAll(() => {
    server.resetHandlers();
    server.close();
  });

  test('requiredClaims from offering data are correctly assigned to presentationDefinition', async () => {
    const offerings = await TbdexHttpClient.getOfferings({ pfiDid: pfiDid });
    const offering = offerings[0];

    // :snippet-start: retrievePresentationDefinitionFromOfferingsRequiredClaimsJS
    const presentationDefinition = offering.data.requiredClaims;
    // :snippet-end:

    expect(presentationDefinition).toBeDefined();
    expect(presentationDefinition).toHaveProperty(
      'id',
      customPresentationDefinition.id,
    );
    expect(presentationDefinition).toHaveProperty('input_descriptors');
    expect(Array.isArray(presentationDefinition.input_descriptors)).toBe(true);
  });

  test('find matching offerings with credential validation', async () => {
    const pfiDids = [pfiDid];

    // :snippet-start: findMatchingOfferingsWithCredentialValidationJS
    const payinCurrencyCode = 'USD'; // Desired payin currency code
    const payoutCurrencyCode = 'KES'; // Desired payout currency code

    // Customer's signed credentials in JWT format
    const credentials = [vcJwtResidence, vcJwtSanctions];

    const matchedOfferings = []; // Array to store the matched offerings

    for (const pfiDid of pfiDids) {
      const offerings = await TbdexHttpClient.getOfferings({ pfiDid: pfiDid });

      for (const offering of offerings) {
        // Filter offerings based on the desired currency pair
        if (
          offering.data.payinCurrency.currencyCode === payinCurrencyCode &&
          offering.data.payoutCurrency.currencyCode === payoutCurrencyCode
        ) {
          // Extract the presentation definition from the offering
          const presentationDefinition = offering.data.requiredClaims;

          try {
            // Validate customer's VCs against the offering's presentation definition
            //highlight-start
            PresentationExchange.satisfiesPresentationDefinition({
              vcJwts: credentials,
              presentationDefinition: presentationDefinition,
            });
            //highlight-end

            // Add offerings that match the customer's needs and qualifications
            matchedOfferings.push(offering);
          } catch (e) {
            // Offerings where the customer's VCs do not meet the requirements are skipped
          }
        }
      }
    }
    // :snippet-end:
    expect(matchedOfferings.length).toBeGreaterThan(0);
  });

  test('selects credentials based on presentation definition', () => {
    const credentials = [vcJwtResidence, vcJwtSanctions];
    // :snippet-start: getSelectedCredentialsJS
    // Select the credentials to be used for the exchange
    const selectedCredentials = PresentationExchange.selectCredentials({
      vcJwts: credentials,
      presentationDefinition: customPresentationDefinition,
    });
    // :snippet-end:

    expect(selectedCredentials).toBeDefined();
    expect.soft(selectedCredentials.length).toBe(2);
  });
});
