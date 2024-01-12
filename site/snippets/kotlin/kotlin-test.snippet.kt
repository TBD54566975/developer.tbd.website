fun initKeyManagement(env: string, didUri: string) {
    var keyManager: KeyManager;

    // Determine which key manager you'd like to use based on
    // the environment
    when(env) {
        "development" -> keyManager = InMemoryKeyManager();
        "production" -> keyManager = AwsKeyManager()
    }

    // Initialize or load a DID
    var did: DidDht;
    if (didUri == null) {
        // Create a new DID
        val did = DidDht.create(keyManager)
    } else {
        // Load existing DID
        val did = DidDht(uri = "some_uri", keyManager)
    }
}