<script setup>
import { onBeforeMount, ref, toRaw } from 'vue';
import { PlusIcon as PlusIconMini } from '@heroicons/vue/solid';
import { CheckCircleIcon, TrashIcon } from '@heroicons/vue/outline';

onBeforeMount(async () => {

  // Populate ToDos from DWN

  // Add entry to ToDos array

});

// Adding ToDos
const newTodoDescription = ref('');

async function addTodo() {

}

// Delete ToDo
async function deleteTodo(todoItem) {

}

// Toggling ToDo Status
async function toggleTodoComplete(todoItem) {

}

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-full px-8 py-12 sm:px-6">
      <!-- Title -->
      <div class="sm:max-w-md sm:w-full">
          <h2 class="font-bold text-3xl text-center tracking-tight">
              Todo List
          </h2>
      </div>
      
      <!-- Add ToDos Form -->

      <!-- ToDos -->
      
  </div>
</template>