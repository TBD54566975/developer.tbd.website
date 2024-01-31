import { Offering } from '@tbdex/http-server'

async getOffering(opts: {id: string}): Promise<Offering> {
  const [ result ] =  await dataProvider.queryForOffering('offering', opts.id);

  if (!result) {
    return undefined
  }
  return Offering.factory(result.offering)
}

async getOfferings(): Promise<Offering[]> {
  const results =  await dataProvider.getOfferings('offering');
  const offerings: Offering[] = []

  for (let result of results) {
    const offering = Offering.factory(result.offering)
    offerings.push(offering)
  }

  return offerings
}