# Contribution Guide

There are many ways to be an open source contributor, and we're here to help you on your way! You may:

- Open up an issue or feature request on this repo [click here to open an issue](https://github.com/TBD54566975/developer.tbd.website/issues/new)
- Help another contributor with one of their questions, or a code review
- Suggest improvements to our Getting Started documentation by supplying a Pull Request
- Evangelize our work together in conferences, podcasts, and social media spaces.

This guide is for you.


#### Managing Dependencies

We are centralizing our depencies to a single json object at the root level named `sdk-versions.json`.

```json
{
  "js": {
    "@tbdex/http-client": "0.26.0",
    "@tbdex/http-server": "0.26.0",
    "@tbdex/protocol": "0.26.0",
    "@web5/api": "0.8.4",
    "@web5/credentials": "0.4.2",
    "@web5/crypto": "0.4.0",
    "@web5/crypto-aws-kms": "0.2.0",
    "@web5/dids": "0.4.1",
    "@web5/identity-agent": "0.2.5"
  },
  "maven": {
    "tbdex": "0.10.0",
    "web5-credentials": "0.0.11",
    "web5-dids": "0.0.11",
    "web5-crypto": "0.0.1"
  }
}
```

Whenever you'd like to update a dependency for a specific language, you update that version in the respective language attribute. When you run `pnpm install` these versions will be propagated throughout the repo in the right places.

#### Contributing Content

It's important for the integrity of our documentation to remain in tact while adding content to our docs site. We do this by making sure that most of the code snippets we display are also testable from an execution standpoint. If you plan on editing or adding code snippets to our docs, please follow the guideline below:

## Contributing Code Snippets to Documentation
We appreciate your contributions to our documentation. This guide will help you add or update code snippets using a tagging system, ensuring they are synchronized with the latest test cases.

Setting Up Your Environment
Configure snippet.config.json:
Create a snippet.config.json file in your project with the following content:

```json
{
  "rootDirectory": "./site/testsuites",
  "outputDirectory": "./site/snippets",
  "fileExtensions": [".js", ".ts", ".kt"],
  "snippetTags": {
    "start": ":snippet-start:",
    "end": ":snippet-end:"
  }
}
```

This configuration specifies the directories for your tests and output snippets, the file extensions to be considered, and the tags to denote the start and end of a snippet.

## Use Tags in Test Files:
In your test files, use the :snippet-start: and :snippet-end: tags to denote the beginning and end of a code snippet. Name your snippet immediately after the :snippet-start: tag. For example:

```js
test('createDidDht creates a DID with did:dht method', async () => {
  // :snippet-start: createDidDht
  const didDht = await DidDhtMethod.create({ publish: true });
  // ... rest of the code ...
  // :snippet-end:
});

```


### Generate Snippets:
After creating your snippets, run the command `pnpm shnip`. This will generate a folder called snippets and create a directory structure similar to where the file is.

### Naming and Importing Snippets:
The generated file will be named as 
`functionName.snippet.js` (or the respective 
file extension). For example, the above snippet 
will be `createDidDht.snippet.js`.

To import the snippet in your documentation, use the following format:

```jsx
import CodeSnippet from '@site/src/components/CodeSnippet';
import createDidDht from '!!raw-loader!@site/snippets/web5/build/decentralized-identifiers/createDidDht.snippet.js'

<CodeSnippet snippet={createDidDht} />

```

#### Function convention

Here is what an ideal function should look like in the `query-from-dwn.js`:

```js
export async function queryRecordWithParentId(web5) {
  const response = await web5.dwn.records.query({
    message: {
      filter: {
        parentId: 'bafyreianzpmhbgcgam5mys722vnsiuwn7y4ek6kjeyjptttquasw4hge2m',
      },
    },
  });

  return response;
}
```

Requirements:

- Must export function
- Must pass web5 object (web5 gets instantiated when the tests run)

**Note**

- Everything written within the body of the function will be extracted and added to a `code-snippets-map.json` file. These are not executable, they are only to be used for content.
- `return` statements are excluded from being shown, however, we still need them for testing purposes
- For situations where it doesn't make sense to return anything, we will exclude them from being tested

#### Displaying Code Snippets in MDX

We have a `<CodeSnippets />` component for displaying the code within the JSON map. This is how you use it:

<CodeSnippet functionName="CODE_SNIPPET_FUNCTION_NAME" />

**Example**

```jsx
import CodeSnippet from '@site/src/components/CodeSnippet';

<CodeSnippet functionName="queryProtocolsForMusic" />;
```

This will display the following:

```js
const { protocols } = await web5.dwn.protocols.query({
  message: {
    filter: {
      protocol: 'https://music.org/protocol',
    },
  },
});
```

This is the original function within the file for that page for reference:

```js
export async function queryProtocolsForMusic(web5) {
  const { protocols } = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: 'https://music.org/protocol',
      },
    },
  });

  return protocols;
}
```

#### Testing the code snippets

We use the same folder convention that we do for the `/code-snippets` directory. It should mirror how the docs are currently laid out.

We will have a `testsuites/$langName` directory per language within the monorepo, to it should look like this:

`./site/testsuites/$langName/web5/build/decentralized-web-nodes/query-from.dwn.test.js`

\*\*Note the `.test.` naming convention. This is how Vite will know to run these tests.

Import the code snippets from the original file to run tests against them. Here's an example:

```js
import { test, beforeAll, expect } from 'vitest';
import {
  queryProtocolsWithFilterDescending,
  queryRecordsWithFilterAscending,
  queryProtocolsForMusic,
  queryRecordsFromDID,
  queryRecordWithParentId,
} from '../../../../code-snippets/web5/build/decentralized-web-nodes/query-from-dwn';
import { Web5 } from '@web5/api';
import { setUpWeb5 } from './setup-web5'

let web5;
let did;

// connect to web5 beforeAll tests and assign it to web5 variable. This is how we pass the web5 instance to the code snippets:
beforeAll(async () => {
  await setUpWeb5();
  web5 = result.web5;
  did = result.did;
});

test('queryProtocolsForMusic returns an array of protocols', async () => {
  const protocols = await queryProtocolsForMusic(web5);
  expect(Array.isArray(protocols)).toBe(true);
});
```

**Note**

We have a helper function for setting up identityManager as well. Here's an example:

```js
describe('create identity agent', () => {
  test('createIdentityAgent', async () => {
    agent = await setUpIdentityManager();

    // identityManager test logic
  });
});
  ```

#### Running tests

You can use the following scripts to run the tests:

`pnpm test` to run tests just once
`pnpm test:watch` to run tests in dev mode

## Browser Testing Tutorial Projects

### 1. **Configure Playwright**

First, set up the Playwright configuration. Add or modify the Playwright configuration in your project like this:

    export default {...defaultPlayWrightConfig, otherConfig: ''}

### 2. **Update `package.json`**

To run tests, update the `scripts` section in `package.json`:

- Use the `start-server-and-test` script to set a port and trigger the Playwright test.
- Ensure the port used is unique to avoid conflicts with other running services.

Here is an example configuration for a `todo-starter` app:

    "scripts": {
      "test": "playwright test",
      "test:browser": "start-server-and-test dev http://localhost:5173 test"
    }

### 3. **Create Test Files**

Playwright will automatically recognize and run tests from files with the `.spec.` pattern. For example, for the `todo-completed` test, name your file `todo-completed.spec.js`.

### 4. **Leverage ChatGPT for Test Writing**

Utilize ChatGPT to help write your tests:

- Input the main UI file of your tutorial into ChatGPT.
- Request ChatGPT to create a Playwright test for a specific feature in your app.
- For the `todo-completed` app, we asked ChatGPT to test if a todo item is created and displayed correctly.

Be prepared to refine and adjust the test script provided by ChatGPT.

### **Important Considerations**

- **Handling Long Operations**: If your app uses `Web5.connect()`, which can be time-consuming, it's crucial to detect when this operation completes. Typically, you should wait for a UI element to change post `Web5.connect()`. If your app doesn't have such an indicator, you'll need to implement one.

- **Example**: In the `todo-completed` app, we use the following test to ensure the UI is ready before proceeding:

  test('should allow adding a Todo', async ({ page }) => {
  await page.goto('http://localhost:5174/');

      // Wait for the Web5 connection to complete
      await page.waitForSelector('#mydid-container');

      // Rest of the test script...

  });

### **Remember**

Adhere to the project's coding standards and guidelines. Before submitting your contribution, ensure all tests pass and your code is well-documented.

---

We look forward to your contributions and thank you for helping us improve this project!