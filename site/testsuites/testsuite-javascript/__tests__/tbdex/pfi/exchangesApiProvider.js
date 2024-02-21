import { MockExchangesApiProvider } from '../../utils/mockExchangesApiProvider'

export default class ExchangesApiProvider extends MockExchangesApiProvider {

    // :snippet-start: pfiOverviewWriteJs
    async write(message) {
        await this.dataProvider.insert('exchange', {
                exchangeid: message.metadata.exchangeId,
                messagekind: message.metadata.kind,
                messageid: message.metadata.id,
                subject: message.metadata.subject,
                message: JSON.stringify(message)
            });
    }  
    // :snippet-end:

}