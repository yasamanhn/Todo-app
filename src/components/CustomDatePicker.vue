<template>
  <date-picker
    v-model="selectedDate"
    :format="format"
    :locale="locale"
    class="custom-datepicker"
    @input="emitDate"
  >
  </date-picker>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import DatePicker from "vue3-persian-datetime-picker";

const props = defineProps({
  modelValue: String,
  format: {
    type: String,
    default: "jYYYY/jMM/jDD",
  },
  locale: {
    type: String,
    default: "fa",
  },
});

const selectedDate = ref(props.modelValue || "");

const emit = defineEmits(["update:modelValue"]);

const emitDate = (value) => {
  emit("update:modelValue", value);
};

watch(selectedDate, (newValue) => {
  emit("dateChanged", newValue);
});
</script>

<style>
.vpd-icon-btn {
  background-color: #e2cfea3d !important;
  color: #5e548ea1 !important;
  border-radius: 10px !important;
  box-shadow: rgba(12, 12, 19, 0.3) 0px 2px 2px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  height: 30px;
}
.vpd-icon-btn svg {
  fill: #5e548ea1 !important;
}
.form-control {
  border-radius: 12px !important;
  background-color: #e2cfea3d;
  box-shadow: rgba(12, 12, 19, 0.372) 0px 2px 2px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 2px -1px;
  height: 50px;
  width: 100%;
}
.vpd-input-group {
  gap: 10px;
  align-items: center;
}
.vpd-input-group,
.form-control {
  color: rgb(87, 85, 85) !important;
}
.vpd-header {
  background-color: #5e548ea1 !important;
  color: #003566 !important;
  font-family: "Peyda";
}
.vpd-month-label {
  color: #003566 !important;
  font-family: "Peyda";
}
.vpd-day-effect {
  background-color: #5e548ea1 !important;
}
.vpd-day-text {
  color: #4d4f51 !important;
  font-family: "Peyda";
}
.vpd-actions button {
  color: #5e548e !important;
  font-size: 15px !important;
  font-weight: 600;
  font-family: "Peyda";
}
.vpd-weekday {
  font-family: "Peyda";
}
@media (min-width: 526px) {
  .vpd-input-group {
    padding: 0;
  }
}
</style>
