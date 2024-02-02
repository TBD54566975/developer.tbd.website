async write({ message }) {
    await dataProvider.insert(
        'exchange',
        {
            exchangeid: message.exchangeId,
            messagekind: message.kind,
            messageid: message.id,
            subject: message.subject,
            message: JSON.stringify(message)
        });
}  