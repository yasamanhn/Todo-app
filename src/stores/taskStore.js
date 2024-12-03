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
    async fetchTasks() {
      const toast = useToast();
      try {
        this.tasks = await fetchTasks();
      } catch (error) {
        toast.error(
          "خطا در دریافت تسک‌ها: " +
            (error.response?.data?.message || error.message)
        );
      }
    },

    async addTask(task) {
      const toast = useToast();
      try {
        const newTask = await addTask(task);
        this.tasks.push(newTask);
        toast.success("تسک جدید با موفقیت اضافه شد!");
      } catch (error) {
        toast.error(
          "خطا در اضافه کردن تسک: " +
            (error.response?.data?.message || error.message)
        );
      }
    },

    async removeTask(taskId) {
      const toast = useToast();
      try {
        await removeTask(taskId);
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        toast.success("تسک با موفقیت حذف شد!", {
          style: { background: "red", color: "white" },
        });
      } catch (error) {
        toast.error(
          "خطا در حذف تسک: " + (error.response?.data?.message || error.message)
        );
      }
    },

    async updateTask(taskId, updatedTask) {
      const toast = useToast();
      try {
        const updatedTaskData = await updateTask(taskId, updatedTask);
        const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = updatedTaskData;
        }
        toast.success("تسک با موفقیت به‌روزرسانی شد!");
      } catch (error) {
        toast.error(
          "خطا در به‌روزرسانی تسک: " +
            (error.response?.data?.message || error.message)
        );
      }
    },

    async updateTaskStatus(task) {
      const toast = useToast();
      try {
        const updatedTask = await updateTask(task.id, task);
        const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = updatedTask;
        }
      } catch (error) {
        toast.error(
          "خطا در به‌روزرسانی وضعیت تسک: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
    // متد جدید برای حذف تسک از استور
    updateTasksAfterDeletion(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
  },
});
