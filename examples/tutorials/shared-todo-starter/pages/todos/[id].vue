<!-- pages/todos/_id.vue -->
<template>
    <div class="container mx-auto p-4 w-1/3">
        <header class="flex-col text-center justify-center mb-4">
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
                     <div @click="toggleTodoComplete(item)" class="cursor-pointer">
                        <CheckCircleIcon class="h-8 text-gray-200 w-8" :class="{ 'text-green-500': item.data.completed }" />
                    </div>
                    <div class="font-light ml-3 text-gray-500 text-xl">
                        {{ item.data.description }}
                        <p class="text-gray-400 text-sm">Added by: {{ item.data.author.substr(0, 22) }}...</p>
                    </div>
                    <div class="ml-auto">
                        <!-- <div @click="deleteTodo(item)" class="cursor-pointer">
                            <TrashIcon class="h-8 text-gray-200 w-8" :class="'text-red-500'" />
                        </div> -->
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

const route = useRoute()
const listId = ref(route.params.id)
const myDID = "did:example:12abcsdsd"; //placeholder

// Adding Todos
const newTodoDescription = ref('');
const fetchingListInfo = ref(true);


const todoList = ref({
    title: 'Todo List 3',
    description: 'This is the third todo list',
    creatorDID: 'did:example:12abcsdsd',
    recipientID: 'did:example:123456789abcdefghi',
})

const todoItems = ref([
    {
        id: dffgdgdgdfgdfg,
        data: {
            description: 'Item 1',
            author: 'did:example:123456789abcdefghi',
            completed: false
        }

    },
    {
        id: erfe436fgfhjj56,
        data: {
            description: 'Item 2',
            author: 'did:another:12abcsdsd',
            completed: false
        }
    }
]);

async function addTodo() {

}

async function toggleTodoComplete(todo) {

}

// async function deleteTodo() {

// }


</script>