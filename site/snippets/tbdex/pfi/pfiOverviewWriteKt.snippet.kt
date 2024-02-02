suspend fun write(message: Message) {
    val data = mapOf(
        "exchangeid" to message.exchangeId,
        "messagekind" to message.kind,
        "messageid" to message.id,
        "subject" to message.subject,
        "message" to objectMapper.writeValueAsString(message)
    )
    dataProvider.insert("exchange", data)
}