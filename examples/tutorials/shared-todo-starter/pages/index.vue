<template>
    <div class="container mx-auto w-1/3 p-4">
        <header class="flex-col text-center mb-4">
            <h1 class="text-2xl font-bold">Shared Todo</h1>
            <p>Manage a set of todos towards your goals with friends.</p>
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
                        <h2 class="text-xl font-bold">{{ todo.titletodo.data.title }}</h2>
                        <p>{{ todo.data.description }}</p>
                        <p class="text-gray-500">Created by: {{ todo.data.author.substr(0, 22) }}...</p>
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
import { ref } from 'vue'

const showForm = ref(false)
const newTodo = ref({
    title: '',
    description: '',
    recipientDID: '',
})
const sharedList = ref([
    {
        "title": "Build a house",
        "description": "A couple of things we need to do to compete this goal",
        "recipientDID": "did:example:123456789abcdefghi",
    },
    {
        "title": "My second shared todo",
        "description": "This is my second shared todo",
        "recipientDID": "did:ion:123456789abcdefghi",
    }
])

const createSharedList = () => {
    const generatedListID = Math.random().toString(36).substring(2);
    sharedTodos.value.push({
        id: generatedListID,
        data: {
            ...newTodo.value
        }
    })
    newTodo.value = { title: '', description: '', userId: '', alias: '' }
    showForm.value = false
}
</script>Z

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
