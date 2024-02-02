import tbdex.sdk.httpserver.models.SubmitKind

httpApi.submit(SubmitKind.rfq) { call, message, offering ->
    ExchangesApiProvider.write(message)
    call.respond(HttpStatusCode.Accepted)
}

httpApi.submit(SubmitKind.order) { call, message, offering ->
    ExchangesApiProvider.write(message)
    call.respond(HttpStatusCode.Accepted)
}

httpApi.submit(SubmitKind.close) { call, message, offering ->
    ExchangesApiProvider.write(message)
    call.respond(HttpStatusCode.Accepted)
}