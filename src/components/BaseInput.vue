<template>
  <v-text-field
    :label="label"
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
  >
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
  </v-text-field>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

// Define props
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "Input",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

// Define emits
const emit = defineEmits();
</script>

<style scoped>
::v-deep(.v-field--variant-solo) {
  border-radius: 14px;
  background: #e2cfea3d !important;
  color: #5e548e;
}
::v-deep(.v-field__input) {
  font-size: 16px !important;
}
</style>
