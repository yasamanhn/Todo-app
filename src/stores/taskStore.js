import { defineStore } from "pinia";
import {
  fetchTasks,
  addTask,
  removeTask,
  updateTask,
} from "../services/taskService";

import { useToast } from "vue-toastification";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    toast: useToast(),

    async fetchTasks() {
      try {
        this.tasks = await fetchTasks();
      } catch (error) {
        this.toast.error(
          "خطا در دریافت تسک‌ها: " +
            (error.response?.data?.message || error.message)
        );
      }
    },

    async addTask(task) {
      try {
        const newTask = await addTask(task);
        this.tasks.push(newTask);
      } catch (error) {
        this.toast.error(
          "خطا در اضافه کردن تسک: " +
            (error.response?.data?.message || error.message)
        );
      }
    },

    async removeTask(taskId) {
      try {
        await removeTask(taskId);
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      } catch (error) {
        this.toast.error(
          "خطا در حذف تسک: " + (error.response?.data?.message || error.message)
        );
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
        this.toast.error(
          "خطا در به‌روزرسانی تسک: " +
            (error.response?.data?.message || error.message)
        );
      }
    },

    async updateTaskStatus(task) {
      try {
        const updatedTask = await updateTask(task.id, task);
        const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = updatedTask;
        }
      } catch (error) {
        this.toast.error(
          "خطا در به‌روزرسانی وضعیت تسک: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
  },
});
