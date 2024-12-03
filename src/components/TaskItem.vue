<template>
  <!-- Filter Tasks -->
  <v-select
    class="custom-select text-capitalize mt-10 mb-10 w-50 w-sm-33 w-lg-33 p-0 text-primary"
    clearable
    label="Filter"
    :items="['All', 'Active', 'Completed']"
    variant="underlined"
    :menu-props="{ class: 'custom-menu' }"
    v-model="filterStatus"
  ></v-select>

  <!-- Task list -->
  <div v-if="filteredTasks.length > 0" class="task-list-container">
    <div
      v-for="(task, index) in filteredTasks"
      :key="task.id"
      class="task-item pa-2 items-center justify-lg-space-between"
    >
      <div class="d-flex justify-space-between mb-2">
        <div class="checkbox-wrapper-11 justify-space-between align-center">
          <input
            :id="'checkbox-' + task.id"
            type="checkbox"
            class="checkbox"
            :class="{ checked: task.completed }"
            v-model="task.completed"
            @change="updateTaskStatus(task)"
          />
          <label
            :for="'checkbox-' + task.id"
            class="text-primary font-weight-bold"
            :class="{
              'line-through': task.completed,
              'text-gray': task.completed,
            }"
            >{{ task.title }}</label
          >
        </div>

        <div>
          <!-- Dropdown Container -->
          <div class="position-relative" @click="toggleDropdown(index)">
            <!-- More Icon -->
            <v-icon class="action-btn" color="primary"
              >mdi-dots-vertical</v-icon
            >

            <!-- Dropdown Menu -->
            <div v-if="dropdownVisible === index" class="dropdown-menu">
              <p
                class="dropdown-item cursor-none font-weight-bold"
                :class="{
                  'text-gray': task.completed,
                  'text-danger': !task.completed,
                }"
              >
                {{ task.completed ? "Complete" : "Active" }}
              </p>
              <div class="dropdown-divider"></div>
              <p
                class="dropdown-item cursor-pointer"
                @click="openEditModal(task)"
              >
                <v-icon class="mr-1" color="primary">mdi-pen</v-icon>Edit
              </p>
              <div class="dropdown-divider"></div>
              <p
                class="dropdown-item cursor-pointer"
                @click="removeTask(task.id)"
              >
                <v-icon class="mr-1" color="danger">mdi-delete</v-icon>Delete
              </p>
            </div>
          </div>

          <!-- The body of the page or the section to handle the click outside -->
          <div @click="closeDropdown" class="page-body"></div>
        </div>
      </div>
      <div class="d-flex justify-space-between align-center">
        <p class="text-gray text-description">
          {{ task.description }}
        </p>
        <small class="text-gray"> {{ task.date }}</small>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-muted">No tasks available</p>
  </div>

  <!-- Edit Task Modal -->
  <v-dialog v-model="editDialog" max-width="500px">
    <v-card class="rounded-lg">
      <v-card-text class="rounded-lg">
        <v-text-field
          label="Task Title"
          variant="solo"
          v-model="editTitle"
          class="mt-5 custom-input"
        ></v-text-field>

        <v-text-field
          label="Task Description"
          variant="solo"
          v-model="editDescription"
          class="custom-input"
        ></v-text-field>

        <custom-date-picker
          v-model="editDate"
          @dateChanged="handleDateChange"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          class="text-capitalize font-weight-bold"
          @click="editDialog = false"
          >Close</v-btn
        >
        <v-btn
          color="primary"
          class="text-capitalize font-weight-bold"
          @click="updateTask"
          >Save Edit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  defineProps,
  defineEmits,
} from "vue";

import { useTaskStore } from "../stores/taskStore";
import CustomDatePicker from "./CustomDatePicker.vue";

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["taskRemoved"]);

// Access task store
const taskStore = useTaskStore();

const filterStatus = ref("All");
const dropdownVisible = ref(null);

// Toggle dropdown visibility
const toggleDropdown = (index) => {
  dropdownVisible.value = dropdownVisible.value === index ? null : index;
};

// Method to close dropdown if clicked outside
const closeDropdown = (event) => {
  if (
    !event.target.closest(".dropdown-menu") &&
    !event.target.closest(".action-btn")
  ) {
    dropdownVisible.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});

const filteredTasks = computed(() => {
  if (filterStatus.value === "All") {
    return taskStore.tasks;
  }
  if (filterStatus.value === "Active") {
    return taskStore.tasks.filter((task) => !task.completed);
  }
  if (filterStatus.value === "Completed") {
    return taskStore.tasks.filter((task) => task.completed);
  }
  return taskStore.tasks;
});

const removeTask = async (taskId) => {
  try {
    await taskStore.removeTask(taskId);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

const updateTaskStatus = async (task) => {
  try {
    await taskStore.updateTaskStatus(task);
  } catch (error) {
    console.error("Error updating task status:", error);
  }
};

// Edit task modal state
const editDialog = ref(false);
const editTitle = ref("");
const editDescription = ref("");
const editTaskIndex = ref(null);
const editDate = ref("");

// Open edit modal with task data
const openEditModal = (task) => {
  editTitle.value = task.title;
  editDescription.value = task.description;
  editDate.value = task.date;
  editTaskIndex.value = taskStore.tasks.indexOf(task);
  editDialog.value = true;
};

// Save edited task
const updateTask = async () => {
  const updatedTask = {
    ...taskStore.tasks[editTaskIndex.value],
    title: editTitle.value,
    description: editDescription.value,
    date: editDate.value,
  };

  try {
    await taskStore.updateTask(updatedTask.id, updatedTask);
    editDialog.value = false;
  } catch (error) {
    console.error("Error saving edited task:", error);
  }
};

// Handle date change in edit modal
const handleDateChange = (newDate) => {
  editDate.value = newDate;
  console.log("Received selected date in parent:", newDate);
};
</script>

<style scoped>
/* drop down */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
  padding: 8px 0;
  min-width: 150px;
}

.dropdown-item {
  padding: 8px 16px;
  font-size: 0.875rem;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.dropdown-item:hover {
  background-color: #f9f9f9;
}

.dropdown-divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 4px 0;
}

/* scroll style */
.task-list-container {
  max-height: 300px;
  padding-right: 8px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #848484ea #f5f3f4;
}

@media (min-width: 320px) {
  .task-list-container {
    max-height: 500px !important;
  }
}
@media (min-width: 959px) {
  .task-list-container {
    max-height: 250px !important;
  }
}
@media (min-width: 849px) {
  .task-list-container {
    max-height: 400px !important;
  }
}

@media (max-width: 849px) {
  .task-item {
    background-color: #f5f3f4b8 !important;
  }
}
/* سفارشی‌سازی برای Chrome, Edge و Safari */
.task-list-container::-webkit-scrollbar {
  cursor: pointer;
}

/* Task item */
.task-item {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 15px;
}
/* style for completed task */
.line-through {
  text-decoration: line-through;
}

.active {
  color: #5e548e;
}

.checkbox {
  accent-color: #5e548e !important;
}

.checkbox.checked {
  accent-color: #5c677d;
}

.checkbox-wrapper-11 {
  --text: #414856;
  --disabled: #c3c8de;
  --border-radius: 10px;
  border-radius: var(--border-radius);
  position: relative;
  display: grid;
  grid-template-columns: 30px auto;
  align-items: center;
}
.checkbox-wrapper-11 label {
  color: var(--text);
  position: relative;
  cursor: pointer;
  display: grid;
  align-items: center;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  transition: color 0.3s ease;
}
.checkbox-wrapper-11 label::before,
.checkbox-wrapper-11 label::after {
  content: "";
  position: absolute;
}
.checkbox-wrapper-11 label::before {
  height: 2px;
  width: 8px;
  left: -27px;
  border-radius: 20px !important;
}
.checkbox-wrapper-11 label:after {
  height: 4px;
  width: 4px;
  top: 8px;
  left: -25px;
  border-radius: 50%;
}

.checkbox-wrapper-11 input[type="checkbox"] {
  position: relative;
  height: 18px;
  width: 18px;
  outline: none;
  border: 0;
  margin: 0 15px 0 0;
  cursor: pointer;
  display: grid;
  align-items: center;
}
.checkbox-wrapper-11 input[type="checkbox"]::before,
.checkbox-wrapper-11 input[type="checkbox"]::after {
  content: "";
  position: absolute;
  height: 2px;
  top: auto;
  background: var(--check);
  border-radius: 2px;
}
.checkbox-wrapper-11 input[type="checkbox"]::before {
  width: 0px;
  right: 60%;
  transform-origin: right bottom;
}
.checkbox-wrapper-11 input[type="checkbox"]::after {
  width: 0px;
  left: 40%;
  transform-origin: left bottom;
}
.checkbox-wrapper-11 input[type="checkbox"]:checked::before {
  -webkit-animation: check-01-11 0.4s ease forwards;
  animation: check-01-11 0.4s ease forwards;
}
.checkbox-wrapper-11 input[type="checkbox"]:checked::after {
  -webkit-animation: check-checkbox-1 0.4s ease forwards;
  animation: check-checkbox-1 0.4s ease forwards;
}

.checkbox-wrapper-11 input[type="checkbox"]:checked + label {
  -webkit-animation: move-11 0.3s ease 0.1s forwards;
  animation: move-11 0.3s ease 0.1s forwards;
}
.checkbox-wrapper-11 input[type="checkbox"]:checked + label::before {
  -webkit-animation: slice-11 0.4s ease forwards;
  animation: slice-11 0.4s ease forwards;
}
.checkbox-wrapper-11 input[type="checkbox"]:checked + label::after {
  -webkit-animation: firework-11 0.5s ease forwards 0.1s;
  animation: firework-11 0.5s ease forwards 0.1s;
}

@-webkit-keyframes move-11 {
  50% {
    padding-left: 8px;
    padding-right: 0px;
  }
  100% {
    padding-right: 4px;
  }
}

@keyframes move-11 {
  50% {
    padding-left: 8px;
    padding-right: 0px;
  }
  100% {
    padding-right: 4px;
  }
}
@-webkit-keyframes slice-11 {
  60% {
    width: 100%;
    left: 4px;
  }
  100% {
    width: 100%;
    left: -2px;
    padding-left: 0;
  }
}
@keyframes slice-11 {
  60% {
    width: 100%;
    left: 4px;
  }
  100% {
    width: 100%;
    left: -2px;
    padding-left: 0;
  }
}
@-webkit-keyframes check-01-11 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }
  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }
  51% {
    width: 0px;
    top: 8px;
    transform: rotate(45deg);
  }
  100% {
    width: 5px;
    top: 8px;
    transform: rotate(45deg);
  }
}
@keyframes check-01-11 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }
  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }
  51% {
    width: 0px;
    top: 8px;
    transform: rotate(45deg);
  }
  100% {
    width: 5px;
    top: 8px;
    transform: rotate(45deg);
  }
}
@-webkit-keyframes check-checkbox-1 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }
  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }
  51% {
    width: 0px;
    top: 8px;
    transform: rotate(-45deg);
  }
  100% {
    width: 10px;
    top: 8px;
    transform: rotate(-45deg);
  }
}
@keyframes check-checkbox-1 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }
  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }
  51% {
    width: 0px;
    top: 8px;
    transform: rotate(-45deg);
  }
  100% {
    width: 10px;
    top: 8px;
    transform: rotate(-45deg);
  }
}
@-webkit-keyframes firework-11 {
  0% {
    opacity: 1;
    box-shadow: 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0,
      0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    box-shadow: 0 -15px 0 0px #4f29f0, 14px -8px 0 0px #4f29f0,
      14px 8px 0 0px #4f29f0, 0 15px 0 0px #4f29f0, -14px 8px 0 0px #4f29f0,
      -14px -8px 0 0px #4f29f0;
  }
}
@keyframes firework-11 {
  0% {
    opacity: 1;
    box-shadow: 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0,
      0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    box-shadow: 0 -15px 0 0px #4f29f0, 14px -8px 0 0px #4f29f0,
      14px 8px 0 0px #4f29f0, 0 15px 0 0px #4f29f0, -14px 8px 0 0px #4f29f0,
      -14px -8px 0 0px #4f29f0;
  }
}
</style>
