// :prepend-start: addServiceToDidDocJS updateServiceEndpointJS removeServiceEndpointJS
import {DidDht} from '@web5/dids';
// :prepend-end:
import { test, expect, describe } from 'vitest';


describe('Update DID Document', () => {

    test('add service to DID Document', async () => {
      const myBearerDid = await DidDht.create({ options: { publish: true } });
      
      // :snippet-start: addServiceToDidDocJS
      // if service does not exist, create an empty array
      myBearerDid.document.service = myBearerDid.document.service || [];

      // add a service to the DID document
      myBearerDid.document.service.push({
        id: 'pfi',
        type: 'PFI',
        serviceEndpoint: 'https://example.com/'
      });

      // republish the updated DID document
      DidDht.publish({did: myBearerDid});
      // :snippet-end: 

      expect(myBearerDid.document.service[0].id).equals('pfi');
    });

    test('modify service in DID Document', async () => {
      const myBearerDid = await DidDht.create({ 
        options:{
          publish: true,
          services: [{
              id: 'pfi',
              type: 'PFI',
              serviceEndpoint: 'https://example.com/'
          }]
        }
      });
      const newEndpoint = 'https://newexample.com/';
      
      // :snippet-start: updateServiceEndpointJS
      // update the service endpoint
      myBearerDid.document.service.find(s => s.type === 'PFI').serviceEndpoint = newEndpoint;

      // republish the updated DID document
      DidDht.publish({did: myBearerDid});
      // :snippet-end: 

      expect(myBearerDid.document.service[0].serviceEndpoint).equals(newEndpoint);
    }); 
    
    test('remove service from DID Document', async () => {
      const myBearerDid = await DidDht.create({ 
        options:{
          publish: true,
          services: [{
              id: 'pfi',
              type: 'PFI',
              serviceEndpoint: 'https://example.com/'
          }]
        }
      });

      // :snippet-start: removeServiceEndpointJS
      // keep all services except the one with type 'PFI'
      const updatedServices = myBearerDid.document.service.filter(s => s.type != 'PFI')
      myBearerDid.document.service = updatedServices;

      // republish the updated DID document
      DidDht.publish({did: myBearerDid});
      // :snippet-end: 

      expect(myBearerDid.document.service.length).equals(0);
    }); 
  });