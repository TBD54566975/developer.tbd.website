export class MockDataProvider {
    constructor() {
        this.responses = new Map();
    }

    // Setup can handle an arbitrary number of parametrs
    setup(methodName, ...args) {
<<<<<<< HEAD
        // Separate the last argument as response
        const response = args.pop(); // Destructure the last argument as response
        const params = args;
    
        // Serialize parameters for key
        const paramsKey = params.join('');
        const key = `${methodName}:${paramsKey}`;
    
        this.responses.set(key, response);
    }  
=======
        // The last argument is expected to be the response
        const response = args.pop();
        const paramsKey = JSON.stringify(args); // Serialize parameters for key
        const key = `${methodName}:${paramsKey}`;

        this.responses.set(key, response);
    }
>>>>>>> main

    // Convenience setup methods

    setupInsert(...args) {
        this.setup("insert", args);
    }

<<<<<<< HEAD
    setupGet(collection, id, response) {
        this.setup("get", collection, id, response);
    }

    setupQuery(collection, query, response) {
        this.setup("query", collection, query, response);
=======
    setupGet(...args) {
        this.setup("insert", args);
    }

    setupQuery(...args) {
        this.setup("insert", args);
>>>>>>> main
    }

    // Method to find and return the response for the given method and parameters
    async execute(methodName, ...params) {
<<<<<<< HEAD
        const paramsKey = params.join('');
=======
        const paramsKey = JSON.stringify(params);
>>>>>>> main
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
<<<<<<< HEAD
        return;
    }

    async get(collection, id) {
        return this.execute('get', collection, id);
    }

    async query(collection, query) {
        return this.execute('query', collection, query);
=======
        return this.execute('insert', "");
    }

    async get(...params) {
        return this.execute('get', ...params);
    }

    async query(...params) {
        return this.execute('query', ...params);
>>>>>>> main
    }
}