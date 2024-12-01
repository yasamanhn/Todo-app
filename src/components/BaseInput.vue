<template>
  <v-text-field
    :label="label"
    :value="modelValue"
    :outlined="outlined"
    :dense="dense"
    :color="color"
    :type="type"
    :placeholder="placeholder"
    :class="{ 'focused-input': isFocused }"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
  >
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
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
    color: {
      type: String,
      default: "customColor-100",
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isFocused: false,
    };
  },

  methods: {
    onFocus() {
      this.isFocused = true;
    },
    onBlur() {
      this.isFocused = false;
    },
    onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
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
