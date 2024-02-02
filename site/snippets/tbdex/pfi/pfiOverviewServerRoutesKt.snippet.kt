import tbdex.sdk.httpserver.models.SubmitKind

httpApi.submit(SubmitKind.rfq) { call, messageKind, offering ->
    ExchangesApiProvider.write(offering)
    call.respond(HttpStatusCode.Accepted)
}

httpApi.submit(SubmitKind.order) { call, messageKind, offering ->
    ExchangesApiProvider.write(offering)
    call.respond(HttpStatusCode.Accepted)
}

httpApi.submit(SubmitKind.close) { call, messageKind, offering ->
    ExchangesApiProvider.write(offering)
    call.respond(HttpStatusCode.Accepted)
}