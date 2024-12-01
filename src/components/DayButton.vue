<template>
  <v-btn
    :class="['day-button', { 'current-day': isCurrent }]"
    @click="$emit('update:modelValue', day)"
  >
    {{ day }}
  </v-btn>
</template>

<script>
export default {
  props: {
    day: String,
    isCurrent: Boolean,
    modelValue: String,
  },
};
</script>

<style scoped>
.day-button {
  text-transform: capitalize;
  border-radius: 14px;
  height: 40px;
  pointer-events: none;
  color: #003566;
  font-weight: 600;
  font-size: 16px;
}

.current-day {
  background-color: #e2cfea;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: 2px solid #cdafdabe;
}
</style>
