import { Offering } from '@tbdex/http-server'
const offeringsApiProvider = {
  getOffering: (opts) => {
      dataProvider.get('offering', opts.id).then(([result]) => {
          if (!result) {
              return undefined
          }
          return Offering.factory(result.offering)
      });
  },

  getOfferings: (opts) => {
    dataProvider.query('offering', "*").then((results) => {
        const offerings = []
  
        for (let result of results) {
            const offering = Offering.factory(result.offering)
            offerings.push(offering)
        }
    
        return offerings
    });
  },
