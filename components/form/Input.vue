<script setup lang="ts">
type Props = {
    modelValue: string;
    placeholder: string;
    name: string;
    label?: string;
    size?: 'sm' | 'lg';
    errors?: string[] | undefined;
    type?: 'text' | 'date';
};

withDefaults(defineProps<Props>(), {
    type: 'text',
});
const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div
        class="form-control"
        :class="{
            ['form-control--' + size]: size,
            'form-control--error': errors?.length,
            'form-control--success': modelValue && !errors?.length,
        }"
    >
        <label :for="name" v-if="label">{{ label }}</label>
        <input
            :id="name"
            :name="name"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @input="emit('update:modelValue', ($event.currentTarget as HTMLInputElement).value)"
        />
        <span class="form-control__error" v-if="errors?.length">{{ errors[0] }}</span>
    </div>
</template>
