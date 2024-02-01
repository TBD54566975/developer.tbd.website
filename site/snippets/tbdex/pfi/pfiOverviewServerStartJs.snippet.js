const server = httpApi.listen(config.port, () => {
    log.info(`Mock PFI listening on port ${config.port}`)
})