<template>
  <div class="">
    <!-- Days Buttons -->
    <v-col class="day-button pa-0 mb-5 mt-3">
      <DayButton
        v-for="(day, index) in daysOfWeek"
        :key="index"
        :day="day"
        :isCurrent="index === currentDay"
        v-model="selectedDay"
      />
    </v-col>
    <v-col
      direction="row"
      align="start"
      class="text-center text-sm-left align-center pa-0 mb-5"
    >
      <div class="text-gray text-sm w-sm-50" style="font-size: 0.9rem">
        {{ formattedDate }}
      </div>
    </v-col>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { toJalaali } from "jalaali-js";
import DayButton from "./DayButton.vue";
const today = new Date();
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const currentDay = today.getDay();
const selectedDay = ref(daysOfWeek[currentDay]);

// تابع برای تبدیل تاریخ میلادی به شمسی و فرمت کردن
const formatJalaaliDate = (date) => {
  const jalaali = toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  return `${jalaali.jy}/${jalaali.jm}/${jalaali.jd}`;
};

const formattedDate = computed(() => {
  const gregorianDate = today.toLocaleDateString(); // تاریخ میلادی
  const jalaaliDate = formatJalaaliDate(today); // تاریخ شمسی
  return `Today is: ${gregorianDate} - ${jalaaliDate}`;
});
</script>

<style scoped>
@media (max-width: 546px) {
  .day-button {
    display: none;
    padding: 0;
    margin: 0;
  }
}
@media (min-width: 546px) {
  .day-button {
    display: flex;
    gap: 0.5rem;
  }
}
</style>
