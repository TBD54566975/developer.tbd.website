import { MockOfferingsApiProvider } from '../../utils/mockOfferingsApiProvider'
import { Offering } from '@tbdex/protocol'

export class OfferingsApiProvider extends MockOfferingsApiProvider {

    constructor(pfiDid) {
        super();
        this.pfiDid = pfiDid;
    }
  
    // :snippet-start: pfiOverviewReadOfferingsJs
    async getOffering(id) {
        return this.dataProvider.get('offering', id).then((result) => {
            return Offering.create({
                metadata: { 
                    id: id,
                    from: this.pfiDid.did 
                },
                data: result
            });
        });
    }
  
    async getOfferings() {
        return this.dataProvider.query('offering', "*").then((results) => {
            const offerings = [];
      
            for (let result of results) {
                const offering = Offering.create({
                  metadata: { from: this.pfiDid },
                  data: result.offering
                })
                offerings.push(offering);
            }
        
            return offerings;
        });
    }
    // :snippet-end:
}