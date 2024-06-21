import { MockDataProvider } from './mockDataProvider'
import { Offering } from '@tbdex/protocol'
import { DevTools } from '@tbdex/http-client';

export class MockOfferingsApiProvider {

    constructor() {
        this.dataProvider = new MockDataProvider()
    }

    //---------------------------------------------------------------------------//
    // Implementation of interface
    //---------------------------------------------------------------------------//

    async getOffering(id) {
        this.dataProvider.get('offering', id).then(([result]) => {
            return Offering.create({
                metadata: { from: this.pfiDid },
                data: result.data
            })
        });
    }
  
    getOfferings() {
        this.dataProvider.query('offering', "*").then((results) => {
            const offerings = []
      
            for (let result of results) {
                const offering = Offering.create({
                  metadata: { from: this.pfiDid },
                  data: result.data
                })
                offerings.push(offering)
            }
        
            return offerings
        });
    }

    //---------------------------------------------------------------------------//
    // Setup Methods
    //---------------------------------------------------------------------------//
  
    setOffering(id, offering) {
console.log('called setOffering', id, offering)
        this.dataProvider.setupGet('offering', id, () => {
            return offering
        })
    }

    setOfferings(offeringData) {
        this.dataProvider.setupQuery('offering', "*", () => {
            const offerings = []
            offeringData.forEach(offering => {
                offerings.push(DevTools.createOffering(offering))
            });

            return offerings;
        })
    }    
  };  