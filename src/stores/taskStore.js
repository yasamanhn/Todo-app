import { defineStore } from "pinia";
import {
  fetchTasks,
  addTask,
  removeTask,
  updateTask,
} from "../services/taskService";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      try {
        this.tasks = await fetchTasks();
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },

    async addTask(task) {
      try {
        const newTask = await addTask(task);
        this.tasks.push(newTask);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },

    async removeTask(taskId) {
      try {
        await removeTask(taskId);
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },

    async updateTask(taskId, updatedTask) {
      try {
        const updatedTaskData = await updateTask(taskId, updatedTask);
        const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = updatedTaskData;
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
  },
});
