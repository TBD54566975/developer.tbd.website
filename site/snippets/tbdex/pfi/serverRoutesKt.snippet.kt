import tbdex.sdk.httpserver.models.SubmitKind

tbdexServer.submit(SubmitKind.rfq) { call, messageKind, offering ->
    ExchangesApiProvider.write(offering)
    call.respond(HttpStatusCode.Accepted)
}

tbdexServer.submit(SubmitKind.order) { call, messageKind, offering ->
    ExchangesApiProvider.write(offering)
    call.respond(HttpStatusCode.Accepted)
}

tbdexServer.submit(SubmitKind.close) { call, messageKind, offering ->
    ExchangesApiProvider.write(offering)
    call.respond(HttpStatusCode.Accepted)
}