<template>
  <div>
    <label
      for=""
      v-if="props.label"
      class="block pl-3 ml-px text-sm font-medium"
    >
      {{ props.label }}
    </label>
    <div class="mt-1">
      <input
        :type="props.type"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        class="block px-4 w-full border-gray-300 rounded-full
      shadow-sm focus:ring-blue-500 focus:border-blue-500
      sm:text-sm"
        @input="changeValue"
      />
    </div>
  </div>

</template>

<script setup>
const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'text'
  }
})

const changeValue = (event) => {
  console.log(event)
  emits('update:modelValue', event.target.value)
}

</script>
