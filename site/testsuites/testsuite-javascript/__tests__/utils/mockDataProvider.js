export class MockDataProvider {
    constructor() {
        this.responses = new Map();
    }

    // Setup can handle an arbitrary number of parametrs
    setup(methodName, ...args) {
        // The last argument is expected to be the response
        const response = args.pop();
        const paramsKey = JSON.stringify(args); // Serialize parameters for key
        const key = `${methodName}:${paramsKey}`;

        this.responses.set(key, response);
    }

    // Convenience setup methods

    setupInsert(...args) {
        this.setup("insert", args);
    }

    setupGet(...args) {
        this.setup("get", args);
    }

    setupQuery(...args) {
        this.setup("query", args);
    }

    // Method to find and return the response for the given method and parameters
    async execute(methodName, ...params) {
        const paramsKey = JSON.stringify(params);
        const key = `${methodName}:${paramsKey}`;

        if (this.responses.has(key)) {
            // Call the response function if parameters match
            return this.responses.get(key)(...params);
        } else {
            throw new Error(`No response found for method ${methodName} with the given parameters.`);
        }
    }

    // Mock methods
    async insert(...params) {
        // input shouldn't matter for insert, we'll always return okay
        // unless we want to throw an error
        return;
    }

    async get(...params) {
        return this.execute('get', ...params);
    }

    async query(...params) {
        return this.execute('query', ...params);
    }
}