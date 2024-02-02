import { Offering } from '@tbdex/http-server'

async function getOffering(opts) {
  const [ result ] =  await dataProvider.queryForOffering('offering', opts.id);

  if (!result) {
    return undefined
  }
  return Offering.factory(result.offering)
}


async function getOfferings() {
  const results =  await dataProvider.getOfferings('offering');
  const offerings = []

  for (let result of results) {
    const offering = Offering.factory(result.offering)
    offerings.push(offering)
  }

  return offerings
}