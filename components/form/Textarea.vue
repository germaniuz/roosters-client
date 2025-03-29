<script setup lang="ts">
type Props = {
    modelValue: string;
    placeholder: string;
    name: string;
    rows?: number;
    errors?: string[];
    label?: string;
};

const emit = defineEmits(['update:modelValue']);

withDefaults(defineProps<Props>(), {
    rows: 3,
    errors: undefined,
    label: undefined,
});
</script>

<template>
    <div
        class="form-control"
        :class="{
            'form-control--error': errors?.length,
            'form-control--success': modelValue && !errors?.length,
        }"
    >
        <label v-if="label" class="label">{{ label }}</label>
        <textarea
            :id="name"
            :name="name"
            :placeholder="placeholder"
            :rows="rows"
            :value="modelValue"
            @input="emit('update:modelValue', ($event.currentTarget as HTMLInputElement).value)"
        />
        <span v-if="errors?.length" class="form-control__error">{{ errors[0] }}</span>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/functions';

textarea {
    border: 1px solid var(--c-grey20);
    font-size: functions.rem(14);
    line-height: 1;
    border-radius: var(--b-radius-md);
    background: var(--c-grey00);
    padding: 14px 18px;
    width: 100%;
    background: none;
    transition: all 0.25s ease-in-out;
    color: var(--c-grey70);
    font-family: var(--f-headings), sans-serif;
    resize: none;

    &::placeholder {
        color: var(--c-grey40);
    }

    &:hover {
        border-color: var(--c-grey40);
    }

    &:active,
    &:focus {
        border-color: var(--c-secondary);
    }

    &:disabled {
        background-color: var(--c-grey20);
        border-color: transparent;
    }

    .form-control--sm & {
        padding-block: 4px;
    }

    .form-control--lg & {
        padding-block: 9px;
    }

    .form-control--error & {
        border-color: var(--c-error);
    }

    .form-control--success & {
        border-color: var(--c-success);
    }
}
</style>
