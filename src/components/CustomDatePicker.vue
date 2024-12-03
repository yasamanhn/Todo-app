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

</style>
