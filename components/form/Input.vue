<script setup lang="ts">
type Props = {
    modelValue: string | null | undefined;
    placeholder: string;
    name: string;
    label?: string;
    size?: 'sm' | 'lg';
    errors?: string[] | undefined;
    type?: 'text' | 'date' | 'tel';
    disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
    type: 'text',
    disabled: false,
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
        <label v-if="label" :for="name">{{ label }}</label>
        <input
            :id="name"
            :name="name"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            :disabled="disabled"
            @input="emit('update:modelValue', ($event.currentTarget as HTMLInputElement).value)"
        />
        <span v-if="errors?.length" class="form-control__error">{{ errors[0] }}</span>
    </div>
</template>
