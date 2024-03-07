import { MockExchangesApiProvider } from '../../utils/mockExchangesApiProvider'

export class ExchangesApiProvider extends MockExchangesApiProvider {

    // :snippet-start: pfiOverviewWriteJs
    async write(message) {
        await this.dataProvider.insert('exchange', {
                exchangeid: message.exchangeId,
                messagekind: message.kind,
                messageid: message.id,
                subject: message.subject,
                message: JSON.stringify(message)
            });

        if (message.replyTo != null) {
            await this.dataProvider.insert('callbacks', {
                exchangeId: message.exchangeId,
                uri: message.replyTo
            });
        }
    }  
    // :snippet-end:

}