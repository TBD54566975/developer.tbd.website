async create(offering) {
    await dataProvider.insert(
        'offering',
        {
        offeringid: offering.id,
        payoutcurrency: offering.payoutCurrency.currencyCode,
        payincurrency: offering.payinCurrency.currencyCode,
        offering: JSON.stringify(offering)
    });
}