import { test, expect, describe } from 'vitest';
import { VerifiableCredential } from '@web5/credentials';

describe('decode JWT into VC', () => {
  test('jwt string is correct', async () => {

    // :snippet-start: jwtToVcVar
    const signedVcJwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6a2ZkdGJjbTl6Z29jZjVtYXRmOWZ4dG5uZmZoaHp4YzdtZ2J3cjRrM3gzcXppYXVjcHA0eSMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRW1wbG95bWVudENyZWRlbnRpYWwiXSwiaWQiOiJ1cm46dXVpZDo4ZmQ1MjAzMC0xY2FmLTQ5NzgtYTM1ZC1kNDE3ZWI4ZTAwYjIiLCJpc3N1ZXIiOiJkaWQ6ZGh0OmtmZHRiY205emdvY2Y1bWF0ZjlmeHRubmZmaGh6eGM3bWdid3I0azN4M3F6aWF1Y3BwNHkiLCJpc3N1YW5jZURhdGUiOiIyMDIzLTEyLTIxVDE3OjAyOjAxWiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmRodDp5MzltNDhvem9ldGU3ejZmemFhbmdjb3M4N2ZodWgxZHppN2Y3andiamZ0N290c2toOXRvIiwicG9zaXRpb24iOiJTb2Z0d2FyZSBEZXZlbG9wZXIiLCJzdGFydERhdGUiOiIyMDIxLTA0LTAxVDEyOjM0OjU2WiIsImVtcGxveW1lbnRTdGF0dXMiOiJDb250cmFjdG9yIn0sImV4cGlyYXRpb25EYXRlIjoiMjAyMi0wOS0zMFQxMjozNDo1NloifSwiaXNzIjoiZGlkOmRodDprZmR0YmNtOXpnb2NmNW1hdGY5Znh0bm5mZmhoenhjN21nYndyNGszeDNxemlhdWNwcDR5Iiwic3ViIjoiZGlkOmRodDp5MzltNDhvem9ldGU3ejZmemFhbmdjb3M4N2ZodWgxZHppN2Y3andiamZ0N290c2toOXRvIn0.ntcgPOdXOatULWo-q6gkuhKmi5X3bzCONQY38t_rsC1hVhvvdAtmiz-ccoLIYUkjECRHIxO_UZbOKgn0EETBCA";
    // :snippet-end:

    // :snippet-start: jwtToVcParse
    const vc = VerifiableCredential.parseJwt({ vcJwt: signedVcJwt });
    // :snippet-end:

    expect(typeof signedVcJwt).toBe('string');
    expect(vc).toBeDefined(); 
    expect(vc.issuer).toMatch(/^did:dht:/);
    expect.soft(vc).toHaveProperty('type', 'EmploymentCredential');
    expect.soft(vc.vcDataModel).toHaveProperty('id', 'urn:uuid:8fd52030-1caf-4978-a35d-d417eb8e00b2');
    expect.soft(vc.vcDataModel).toHaveProperty('expirationDate', '2022-09-30T12:34:56Z');
    expect.soft(vc.vcDataModel).toHaveProperty('credentialSubject');
    expect.soft(vc.vcDataModel.credentialSubject).toHaveProperty('startDate', '2021-04-01T12:34:56Z');
    expect.soft(vc.vcDataModel.credentialSubject).toHaveProperty('position', 'Software Developer');
    expect.soft(vc.vcDataModel.credentialSubject).toHaveProperty('employmentStatus', 'Contractor');

  });
});
