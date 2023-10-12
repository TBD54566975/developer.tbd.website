<!-- pages/todos/index.vue -->
<template>
    <div class="container mx-auto p-4 w-1/3">
        <header class="flex-col text-center mb-4">
            <h1 class="text-2xl font-bold mb-4">Shared Todo</h1>
            <p>Manage a set of todos towards your goals with friends.</p>
            <button v-if="myDID" class="btn" id="copy-did" @click="copyDID">Copy your DID</button>
        </header>
        <hr class="my-5" />
        <div v-if="sharedList.length === 0" class="empty-state text-center pt-20">
            <p class="mb-4 text-gray-500">No Shared Todos yet.</p>
        </div>
        <form v-if="showForm" @submit.prevent="createSharedList" class="mb-4">
            <div class="mb-4">
                <label for="title" class="block mb-2">Goal Title:</label>
                <input type="text" id="title" v-model="newTodo.title" class="w-full p-2 border rounded" required />
            </div>
            <div class="mb-4">
                <label for="description" class="block mb-2">Description:</label>
                <textarea id="description" v-model="newTodo.description" class="w-full p-2 border rounded"
                    required></textarea>
            </div>
            <div class="mb-4">
                <label for="userId" class="block mb-2">Recipient's DID:</label>
                <input type="text" id="userId" v-model="newTodo.recipientDID" class="w-full p-2 border rounded" required />
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
            <button type="button" class="btn ml-4 btn-secondary" @click="showForm = false">Cancel</button>
            <!-- Cancel button -->
        </form>
        <div v-else>
            <ul class="mb-10">
                <li v-for="(todo, index) in sharedList" :key="index" class="mb-2 p-4 border rounded">
                    <nuxt-link :to="`/todos/${todo.id}`" class="text-blue-500">
                        <h2 class="text-xl font-bold">{{ todo.data.title }}</h2>
                        <p>{{ todo.data.description }}</p>
                        <p class="text-gray-500">Created by: {{ todo.data.author.substr(0,22) }}...</p>
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <div v-if="!showForm" class="text-center">
            <button @click="showForm = true" class="btn btn-primary">Create Shared Todo List</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Web5 } from '@web5/api/browser';
import protocolDefinition from "assets/shared-todo-protocol.json";

let web5;
let myDID;

const showForm = ref(false);
const newTodo = ref({
    title: '',
    description: '',
    recipientDID: '',
});

const sharedList = ref([]);

onBeforeMount(async () => {
    ({ web5, did: myDID } = await Web5.connect({
        sync: '5s'
    }));
    console.log("this is your DID", myDID);

    await configureProtocol();

    // Fetch shared todo lists.
    const{ records } = await web5.dwn.records.query({
        message: {
            filter: {
                schema: protocolDefinition.types.list.schema,
            },
            dateSort: 'createdAscending'
        }
    });

    console.log("Saved records", records);

    // add entry to sharedList
    for (let record of records) {
        const data = await record.data.json();
        const list = {record, data, id: record.id};
        sharedList.value.push(list);
    }
})

const createSharedList = async () => {
    let recipientDID = newTodo.value.recipientDID;
    const sharedListData = {
        "@type": "list",
        "title": newTodo.value.title,
        "description": newTodo.value.description,
        "author": myDID,
        "recipient": newTodo.value.recipientDID,
    }

    newTodo.value = { title: '', description: '', userId: '', alias: '' }

    try {
        const { record } = await web5.dwn.records.create({
            data: sharedListData,
            message: {
                protocol: protocolDefinition.protocol,
                protocolPath: 'list',
                schema: protocolDefinition.types.list.schema,
                dataFormat: protocolDefinition.types.list.dataFormats[0],
                recipient: recipientDID
            }
        });


        const data = await record.data.json();
        const list = {record, data, id: record.id};

        sharedList.value.push(list);
        showForm.value = false

        const { status: sendStatus } = await record.send(recipientDID);

        if (sendStatus.code !== 202) {
            console.log("Unable to send to target did:" + sendStatus);
            return;
        }
        else {
            console.log("Shared list sent to recipient");
        }
    } catch (e) {
        console.error(e);
        return;
    }

}

const copyDID = async() => {
    await navigator.clipboard.writeText(myDID);
    alert('DID copied to clipboard');
}

const configureProtocol = async () => {
    const { protocols, status } = await web5.dwn.protocols.query({
        message: {
            filter: {
                protocol: protocolDefinition.protocol,
            }
        }
    });

    if(status.code !== 200) {
        alert('Error querying protocols');
        console.error('Error querying protocols', status);
        return;
    }

    if(protocols.length > 0) {
        console.log('Protocol already exists');
        return;
    }

    // configure protocol on local DWN
    const { status: configureStatus, protocol } = await web5.dwn.protocols.configure({
        message: {
            definition: protocolDefinition,
        }
    });

    console.log('Protocol configured', configureStatus, protocol);

    // configuring protocol on remote DWN
    const { status: configureRemoteStatus } = protocol.send(myDID);
    console.log('Protocol configured on remote DWN', configureRemoteStatus);
}
</script>

<style scoped>
.btn {
    padding: 0.5rem 1rem;
    background-color: #3490dc;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-secondary {
    padding: 0.5rem 1rem;
    background-color: #ccc;
    color: #333;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-secondary:hover {
    background-color: #aaa;
}

.btn:hover {
    background-color: #2779bd;
}</style>
