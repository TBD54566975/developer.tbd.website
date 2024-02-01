async write(opts: { message: MessageKindClass }) {
    const result = await dataProvider.insert(
        'exchange',
    {
        exchangeid: message.exchangeId,
        messagekind: message.kind,
        messageid: message.id,
        subject,
        message: JSON.stringify(message)
    });
}  