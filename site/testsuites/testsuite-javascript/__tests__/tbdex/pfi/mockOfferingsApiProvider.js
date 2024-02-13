import { MockDataProvider } from './utils/mockdataprovider'
import { Offering } from '@tbdex/protocol'
import { DevTools } from '@tbdex/http-client';

export class OfferingsApiProvider {

    constructor() {
        this.dataProvider = MockDataProvider()
    }

    //---------------------------------------------------------------------------//
    // Implementation of interface
    //---------------------------------------------------------------------------//

    // :snippet-start: pfiOverviewReadOfferingsJs
    async getOffering(id) {
        this.dataProvider.get('offering', id).then(([result]) => {
            if (!result) {
                return undefined
            }
            return Offering.create({
                metadata: { from: this.pfiDid },
                data: result.offering
            })
        });
    }
  
    getOfferings() {
        this.dataProvider.query('offering', "*").then((results) => {
            const offerings = []
      
            for (let result of results) {
                const offering = Offering.create({
                  metadata: { from: this.pfiDid },
                  data: result.offering
                })
                offerings.push(offering)
            }
        
            return offerings
        });
    }
    // :snippet-end:

    //---------------------------------------------------------------------------//
    // Setup Methods
    //---------------------------------------------------------------------------//
  
    setOffering(id, offeringData) {
        this.dataProvider.setupGet("offering", id, () => {
            return DevTools.createOffering(offeringData)
        })
    }

    setOfferings(offeringData) {
        this.dataProvider.setupGet("offering", "*", () => {
            const offerings = []
            offeringData.forEach(offering => {
                offerings.push(DevTools.createOffering(offering))
            });
        })
    }

    //---------------------------------------------------------------------------//
    // Other methods
    //---------------------------------------------------------------------------//
  
    async createOffering(offering) {
        await this.dataProvider.insert('offering', {
            offeringid: offering.id,
            payoutcurrency: offering.payoutCurrency.currencyCode,
            payincurrency: offering.payinCurrency.currencyCode,
            offering: JSON.stringify(offering)
        });
    }
    
  };  