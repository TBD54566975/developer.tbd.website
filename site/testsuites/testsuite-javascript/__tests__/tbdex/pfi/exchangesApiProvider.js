import { MockExchangesApiProvider } from '../../utils/mockExchangesApiProvider'

<<<<<<< HEAD
export class ExchangesApiProvider extends MockExchangesApiProvider {
=======
export default class ExchangesApiProvider extends MockExchangesApiProvider {
>>>>>>> main

    // :snippet-start: pfiOverviewWriteJs
    async write(message) {
        await this.dataProvider.insert('exchange', {
<<<<<<< HEAD
                exchangeid: message.exchangeId,
                messagekind: message.kind,
                messageid: message.id,
                subject: message.subject,
=======
                exchangeid: message.metadata.exchangeId,
                messagekind: message.metadata.kind,
                messageid: message.metadata.id,
                subject: message.metadata.subject,
>>>>>>> main
                message: JSON.stringify(message)
            });
    }  
    // :snippet-end:

}