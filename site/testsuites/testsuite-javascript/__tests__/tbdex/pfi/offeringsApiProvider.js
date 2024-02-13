import { MockOfferingsApiProvider } from '../../utils/mockOfferingsApiProvider'
import { Offering } from '@tbdex/protocol'

export default class OfferingsApiProvider extends MockOfferingsApiProvider {
  
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

    async createOffering(offering) {
        await this.dataProvider.insert('offering', {
            offeringid: offering.id,
            payoutcurrency: offering.payoutCurrency.currencyCode,
            payincurrency: offering.payinCurrency.currencyCode,
            offering: JSON.stringify(offering)
        });
    }
}