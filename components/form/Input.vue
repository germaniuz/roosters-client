<script setup lang="ts">
type Props = {
    modelValue: string;
    placeholder: string;
    name: string;
    label?: string;
    size?: 'sm' | 'lg';
    errors?: string[] | undefined;
};

defineProps<Props>();
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
            type="text"
            :placeholder="placeholder"
            :value="modelValue"
            @input="emit('update:modelValue', ($event.currentTarget as HTMLInputElement).value)"
        />
        <span class="form-control__error" v-if="errors?.length">{{ errors[0] }}</span>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.form-control {
    margin-bottom: 20px;
}

label {
    font-size: functions.rem(14);
    line-height: functions.rem(16);
    color: var(--c-text-primary);
    font-weight: 700;
}

input {
    color: var(--c-text-primary);
    border: 1px solid var(--c-input-border);
    font-size: functions.rem(15);
    line-height: functions.rem(24);
    border-radius: var(--b-radius-xs);
    padding: 7px 16px;
    width: 100%;
    background: none;

    &::placeholder {
        color: var(--c-text-disabled);
    }

    &:active {
        border-color: var(--c-action-active);
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

.form-control__error {
    font-size: functions.rem(13);
    line-height: 1;
    color: var(--c-error);
}
</style>
