
httpApi.submit('rfq', async (ctx, rfq) => {
    await exchangesApiProvider.write({ message: rfq})
})

httpApi.submit('order', async (ctx, order) => {
    await exchangesApiProvider.write({ message: order })
})

httpApi.submit('close', async (ctx, close) => {
    await exchangesApiProvider.write({ message: close })
})