import { MockOfferingsApiProvider } from '../../utils/mockOfferingsApiProvider'
import { Parser } from '@tbdex/http-server'

export class OfferingsApiProvider extends MockOfferingsApiProvider {

    constructor(pfiDid) {
        super();
        this.pfiDid = pfiDid;
    }
  
    // :snippet-start: pfiOverviewReadOfferingsJs
    async getOffering(id) {
        return this.dataProvider.get('offering', id).then(async (result) => {
            if(result){
                return await Parser.parseResource(result);
            }
        });
    }
    
  
    async getOfferings() {
        return this.dataProvider.query('offering', "*").then((results) => {
            const offerings = [];
            
            for (let result of results) {
                const offering = Parser.rawToResourceModel(result);
                offerings.push(offering);
            }

            return offerings;
        });
    }
    
    async setOffering(offering) {
        await this.dataProvider.insert('offering', {
            offeringid: offering.metadata.id,
            payoutcurrency: offering.data.payout.currencyCode,
            payincurrency: offering.data.payin.currencyCode,
            offering: Parser.rawToResourceModel(offering)
        });
    }
    // :snippet-end:
}