<!-- pages/todos/_id.vue -->
<template>
    <div class="container mx-auto p-4 w-1/3">
        <header class="flex-col text-center mb-4">
            <h1 class="text-2xl font-bold mb-4">Shared Todo</h1>
            <p>Manage a set of todos towards your goals with friends.</p>
            <hr class="my-5" />

            <div v-if="!fetchingListInfo">
                <h2 class="text-xl font-bold">{{ todoList.title }}</h2>
                <p>{{ todoList.description }}</p> <br />
                <p>{{ todoList.author?.substr(0, 22) }}...</p>
                <p>{{ todoList.recipient?.substr(0, 22) }}...</p>
            </div>
            <div v-else>
                <p>Fetching todoList...</p>
            </div>

        </header>
        <div>
            <!-- Add Todo Form -->
            <div class="mt-16 mb-5">
            <form class="flex space-x-4" @submit.prevent="addTodo">
                <div class="border-b border-gray-200 sm:w-full">
                <label for="add-todo" class="sr-only">Add a todo</label>
                <textarea
                    rows="1" name="add-todo" id="add-todo" v-model="newTodoDescription"
                    @keydown.enter.exact.prevent="addTodo"
                    class="block border-0 border-transparent focus:ring-0 p-0 pb-2 resize-none sm:text-lg w-96"
                    placeholder="Add a Todo" />
                </div>
                <button type="submit" class="bg-indigo-600 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-indigo-700 inline-flex items-center p-1 rounded-full shadow-sm text-white">
                <PlusIconMini class="h-5 w-5" aria-hidden="true" />
                </button>
            </form>
            </div>
            <h2 v-if="!fetchingListInfo" class="text-xl font-bold mb-2">Todos</h2>
            <ul>
                <li v-for="(item, index) in todoItems" :key="index" class="flex items-center mb-2 p-4 border rounded">
                     <div @click="toggleTodoComplete(item)" class="cursor-pointer" v-show="myDID == item.data.author">
                        <CheckCircleIcon class="h-8 text-gray-200 w-8" :class="{ 'text-green-500': item.data.completed }" />
                    </div>
                    <div class="font-light ml-3 text-gray-500 text-xl">
                        {{ item.data.description }}
                        <p class="text-gray-400 text-sm">Added by: {{ item.data.author.substr(0,22) }}...</p>
                    </div>
                    <div class="ml-auto">
                        <div @click="deleteTodo(item)" class="cursor-pointer" v-show="myDID == item.data.author">
                            <TrashIcon class="h-8 text-gray-200 w-8" :class="'text-red-500'" />
                        </div>
                        <div v-show="myDID != item.data.author && item.data.completed">
                            <CheckCircleIcon class="h-8 text-gray-200 w-8" :class="{ 'text-green-500': item.data.completed }" />
                        </div>
                    </div>

                </li>
            </ul>
        </div>
        <div class="mt-4">
            <nuxt-link to="/" class="text-blue-500">Back to Todo Lists</nuxt-link>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { PlusIcon as PlusIconMini } from '@heroicons/vue/solid';
import { CheckCircleIcon, TrashIcon } from '@heroicons/vue/outline';
import { Web5 } from '@web5/api/browser'
import protocolDefinition from "assets/shared-todo-protocol.json";

const route = useRoute()
const listId = ref(route.params.id);

let web5;
let myDID;
let todoRecipient;
let todoList = ref({});
let todoItems = ref([]);
const fetchingListInfo = ref(true);

// Adding Todos
const newTodoDescription = ref('');

const getTodoRecipient = () => {
    if (myDID === todoList.author) {
        return todoList.recipient;
    } else {
        return todoList.author;
    }
}


onBeforeMount(async () => {
    ({ web5, did: myDID } = await Web5.connect({
        sync: '5s'
    }));
    console.log("this is your DID", myDID);

    // fetch shared list details.
    const { record } = await web5.dwn.records.read({
        message: {
            recordId: listId.value
        }
    })

    // fetch todos under list.
    const { records: todoRecords } = await web5.dwn.records.query({
        message: {
            filter: {
                parentId: listId.value
            },
        }
    })

    todoList = await record.data.json();
    todoRecipient = await getTodoRecipient();

    // Add entry to ToDos array
    for (let record of todoRecords) {
        const data = await record.data.json();
        const todo = { record, data, id: record.id };
        todoItems.value.push(todo);
    }

    fetchingListInfo.value = false;
});



async function addTodo() {
    const todoData = {
        completed: false,
        description: newTodoDescription.value,
        author: myDID,
        parentId: listId.value
    };

    newTodoDescription.value = '';



    const { record: todoRecord, status: createStatus } = await web5.dwn.records.create({
        data: todoData,
        message: {
            protocol: protocolDefinition.protocol,
            protocolPath: 'list/todo',
            schema: protocolDefinition.types.todo.schema,
            dataFormat: protocolDefinition.types.todo.dataFormats[0],
            parentId: listId.value,
            contextId: listId.value,
        }
    });

    const data = await todoRecord.data.json();
    const todo = { todoRecord, data, id: todoRecord.id };
    todoItems.value.push(todo);

    const { status: sendStatus } = await todoRecord.send(todoRecipient);

    if (sendStatus.code !== 202) {
        console.log("Unable to send to target did:" + sendStatus);
        return;
    }
    else {
        console.log("Sent todo to recipient");
    }

}

async function toggleTodoComplete(todoItem) {
    let toggledTodo;
    let updatedTodoData;

    for (let todo of todoItems.value) {
        if (todoItem.id === todo.id) {
            toggledTodo = todo;
            todo.data.completed = !todo.data.completed;
            updatedTodoData = { ...toRaw(todo.data) };
            break;
        }
    }

    // Get record in DWN
    const { record } = await web5.dwn.records.read({
        message: {
            recordId: toggledTodo.id,
        }
    });

    // Update the record in DWN
    await record.update({ data: updatedTodoData });

    const { status: sendStatus } = await record.send(todoRecipient);

    if (sendStatus.code !== 202) {
        console.log("Unable to send updated data to target did:", sendStatus);
        return;
    }
    else {
        console.log("Sent todo update to recipient");
    }
}

async function deleteTodo(todoItem) {
    // Delete ToDo
    let deletedTodo;
    let index = 0;

    for (let todo of todoItems.value) {
        if (todoItem.id === todo.id) {
            deletedTodo = todo;
            break;
        }
        index++;
    }

    todoItems.value.splice(index, 1);

    // Delete the record in DWN
    const response = await web5.dwn.records.delete({
        message: {
            recordId: deletedTodo.id
        }
    });

    const deleteFromRecipient = await web5.dwn.records.delete({
        from: todoRecipient,
        message: {
            recordId: deletedTodo.id
        }
    });
    console.log("Deleted message", deleteFromRecipient);
}



</script>