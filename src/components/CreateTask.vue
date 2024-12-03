<template>
  <v-btn
    color="secondary"
    class="create-button text-primary font-weight-bold mt-md-3 w-xs-33 w-sm-33 w-md-25"
    @click="dialog = true"
  >
    <v-icon class="mr-2" color="primary " left>mdi-plus</v-icon>
    Create new task
  </v-btn>

  <!-- Modal Dialog -->
  <v-dialog v-model="dialog" max-width="500px">
    <v-card class="rounded-lg">
      <v-card-text class="rounded-lg pa-6">
        <v-text-field
          label="Task Title"
          variant="solo"
          v-model="taskTitle"
          class="mt-5 custom-input"
        ></v-text-field>

        <v-text-field
          label="Task Description"
          variant="solo"
          v-model="taskDescription"
          class="custom-input"
        ></v-text-field>

        <custom-date-picker
          v-model="parentDate"
          @dateChanged="handleDateChange"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          class="text-capitalize font-weight-bold"
          @click="dialog = false"
          >Close</v-btn
        >
        <v-btn
          color="primary"
          class="text-capitalize font-weight-bold"
          @click="addTask"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useTaskStore } from "../stores/taskStore";

import CustomDatePicker from "./CustomDatePicker.vue";

const taskStore = useTaskStore();

const emit = defineEmits(["addTaskEvent"]);

const dialog = ref(false);
const taskTitle = ref("");
const taskDescription = ref("");
const parentDate = ref("");

// Add new task method
const addTask = async () => {
  if (!taskTitle.value.trim() || !taskDescription.value.trim()) {
    alert("Please fill in all fields.");
    return;
  }

  const newTask = {
    title: taskTitle.value,
    description: taskDescription.value,
    date: parentDate.value || "",
    completed: false,
  };

  try {
    await taskStore.addTask(newTask);
    taskTitle.value = "";
    taskDescription.value = "";
    parentDate.value = "";
    dialog.value = false;
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// Handle date change event from the custom date picker
const handleDateChange = (newDate) => {
  parentDate.value = newDate;
};
</script>

<style scoped>
.custom-input .v-input__control input {
  color: rgb(87, 85, 85) !important;
}
::v-deep(.v-field--variant-solo) {
  border-radius: 14px;
  background: #e2cfea3d !important;
  color: #5e548e;
}
::v-deep(.v-text-field) {
  font-size: 16px !important;
}
.create-button {
  text-transform: capitalize;
  font-size: 16px;
  align-items: center;
  border-radius: 14px !important;
  height: 40px;
  border: 2px solid #cdafdabe;
}
</style>
