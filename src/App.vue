<template>
  <v-app class="m-auto">
    <v-container class="pa-5">
      <!-- Header Section -->
      <v-row direction="row" align="start">
        <div
          class="text-h5 mb-5 ml-4 text-sm-left text-center w-100 font-weight-bold mt-5 text-primary"
        >
          Have A Nice Day! 👋🏻
        </div>
      </v-row>
      <!-- Day buttons and Date format -->
      <div
        class="d-flex flex-column justify-start flex-md-row justify-md-space-between"
      >
        <DayDisplay />
        <CreateTask @addTaskEvent="addTask" />
      </div>
      <hr class="mt-5 text-primary" />
      <!-- Task List  -->
      <TaskItem
        :tasks="taskStore.tasks"
        @taskRemoved="updateTasksAfterDeletion"
      />
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTaskStore } from "./stores/taskStore";

import DayDisplay from "./components/DayDisplay.vue";
import CreateTask from "./components/CreateTask.vue";
import TaskItem from "./components/TaskItem.vue";

// State to store tasks
const tasks = ref([]);

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.fetchTasks();
});

// Fetch tasks from the API and update the state
const fetchTasks = async () => {
  try {
    const response = await fetch(
      "https://6734c937a042ab85d11b9e03.mockapi.io/api/todos"
    );
    const data = await response.json();
    tasks.value = data; // Update tasks with data from API
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

// Add a new task by sending data to the API
const addTask = async (newTask) => {
  try {
    // استفاده از addTask از store
    await taskStore.addTask(newTask);
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// Method to update tasks after deletion
const updateTasksAfterDeletion = (taskId) => {
  taskStore.tasks = taskStore.tasks.filter((task) => task.id !== taskId);
};
</script>

<style>
.v-application {
  background: linear-gradient(
      to right top,
      #f0cfac,
      #e6bcaa,
      #d6aca8,
      #c09fa5,
      #a8939e,
      #a294a2,
      #9c95a4,
      #9696a4,
      #9ea6b5,
      #a5b6c5,
      #acc6d4,
      #b4d7e0
    ),
    url("./assets/images/photo_2024-11-21_10-35-33.jpg") !important;

  background-size: cover, contain !important;
  background-repeat: repeat !important;
  background-attachment: fixed !important;
  background-blend-mode: multiply !important;
  opacity: 0.9 !important;
}
.v-container {
  background-color: #f5f3f4;
}

@media (min-width: 849px) {
  .v-container {
    margin: 3rem auto;
    max-width: 800px !important;
    max-height: 600px !important;
    border-radius: 16px !important;
  }
}

@media (min-width: 849px) {
  .v-container {
    background-color: #ffffffd6;
  }
}

@media (max-width: 849px) {
  .v-container {
    background: rgba(189, 179, 194, 0.179);

    background: linear-gradient(
      270deg,
      rgba(189, 179, 194, 0.218) 0%,
      rgba(214, 211, 228, 0.342) 100%
    );

    background: -moz-linear-gradient(
      270deg,
      rgba(189, 179, 194, 0.308) 0%,
      rgba(214, 211, 228, 0.378) 100%
    );

    background: -webkit-linear-gradient(
      270deg,
      rgba(195, 184, 201, 0.562) 0%,
      rgba(214, 211, 228, 0.575) 100%
    );

    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#BCB1C1", endColorstr="#D5D2E3", GradientType=1 );
  }
}
</style>
