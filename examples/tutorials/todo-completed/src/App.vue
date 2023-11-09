<script setup>
import { onBeforeMount, ref, toRaw } from 'vue';
import { PlusIcon as PlusIconMini } from '@heroicons/vue/solid';
import { CheckCircleIcon, TrashIcon } from '@heroicons/vue/outline';
import { Web5 } from '@web5/api';

let web5;
let myDid = ref('');
const todos = ref([]);

onBeforeMount(async () => {
  const web5Result = await Web5.connect();
  web5 = web5Result.web5;
  myDid.value = web5Result.did;

  // Populate todos from DWN
  const { records } = await web5.dwn.records.query({
    message: {
      filter: {
        schema: 'http://some-schema-registry.org/todo',
      },
      dateSort: 'createdAscending',
    },
  });

  // Add entry to Todo array
  for (let record of records) {
    const data = await record.data.json();
    const todo = { record, data, id: record.id };
    todos.value.push(todo);
  }
});

// Adding Todos
const newTodoDescription = ref('');

async function addTodo() {
  const todoData = {
    completed: false,
    description: newTodoDescription.value,
  };

  newTodoDescription.value = '';
  console.log(todoData);

  // Create the record.
  const { record } = await web5.dwn.records.create({
    data: todoData,
    message: {
      schema: 'http://some-schema-registry.org/todo',
      dataFormat: 'application/json',
    },
  });

  // add DWeb message recordId as a way to reference the message for further operations
  // e.g. updating it or overwriting it
  const data = await record.data.json();
  const todo = { record, data, id: record.id };
  todos.value.push(todo);
}

async function deleteTodo(todoItem) {
  let deletedTodo;
  let index = 0;

  for (let todo of todos.value) {
    if (todoItem.id === todo.id) {
      deletedTodo = todo;
      break;
    }
    index++;
  }

  todos.value.splice(index, 1);

  // Delete the record.
  await web5.dwn.records.delete({
    message: {
      recordId: deletedTodo.id,
    },
  });
}

// Toggling Todo Status
async function toggleTodoComplete(todoItem) {
  let toggledTodo;
  let updatedTodoData;

  for (let todo of todos.value) {
    if (todoItem.id === todo.id) {
      toggledTodo = todo;
      todo.data.completed = !todo.data.completed;
      updatedTodoData = { ...toRaw(todo.data) };
      break;
    }
  }

  // Read the record
  const { record } = await web5.dwn.records.read({
    message: {
      recordId: toggledTodo.id,
    },
  });

  // Update the record
  await record.update({ data: updatedTodoData });
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-full px-8 py-12 sm:px-6"
  >
    <!-- Title -->
    <div class="sm:max-w-md sm:w-full">
      <h2 class="font-bold text-3xl text-center tracking-tight">Todo List</h2>
      <div class="flex items-center justify-center">
        <div v-if="!myDid" id="mydid-container">Connecting to web5 . . .</div>
        <div v-else id="mydid-container">Web5 Connected</div>
      </div>
    </div>

    <!-- Add Todo Form -->
    <div class="mt-16">
      <!-- The form will only be displayed if myDid is truthy -->
      <form v-if="myDid" class="flex space-x-4" @submit.prevent="addTodo">
        <div class="border-b border-gray-200 sm:w-full">
          <label for="add-todo" class="sr-only">Add a todo</label>
          <textarea
            rows="1"
            name="add-todo"
            id="add-todo"
            v-model="newTodoDescription"
            @keydown.enter.exact.prevent="addTodo"
            class="block border-0 border-transparent focus:ring-0 p-0 pb-2 resize-none sm:text-sm w-96"
            placeholder="Add a Todo"
          />
        </div>
        <button
          type="submit"
          class="bg-indigo-600 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-indigo-700 inline-flex items-center p-1 rounded-full shadow-sm text-white"
        >
          <!-- Make sure PlusIconMini is a registered component or a known element -->
          <PlusIconMini class="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </div>

    <!-- Todos -->
    <div
      v-if="todos.length > 0"
      class="border-gray-200 border-t border-x mt-16 rounded-lg shadow-md sm:max-w-xl sm:mx-auto sm:w-full"
    >
      <div
        v-for="todo in todos"
        :key="todo"
        class="border-b border-gray-200 flex items-center p-4"
      >
        <div @click="toggleTodoComplete(todo)" class="cursor-pointer">
          <CheckCircleIcon
            class="h-8 text-gray-200 w-8"
            :class="{ 'text-green-500': todo.data.completed }"
          />
        </div>
        <div class="font-light ml-3 text-gray-500 text-xl">
          {{ todo.data.description }}
        </div>
        <!-- Delete Todo -->
        <div class="ml-auto">
          <div @click="deleteTodo(todo)" class="cursor-pointer">
            <TrashIcon class="h-8 text-gray-200 w-8" :class="'text-red-500'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
