<script setup lang="ts">
type Props = {
    label: string;
    name: string;
};

const modelValue = defineModel<boolean>('modelValue');
defineProps<Props>();
</script>

<template>
    <div class="form-control">
        <label class="radio-button">
            <input
                :id="name"
                :name="name"
                type="checkbox"
                :checked="modelValue"
                @change="modelValue = ($event.currentTarget as HTMLInputElement).checked"
            />
            <span class="radio-button__checkmark"></span>
        </label>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.radio-button {
    display: block;
    position: relative;
    padding-left: 50px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 28px;

    &:hover {
        input {
            &:checked {
                & ~ .radio-button__checkmark {
                    background-color: color-mix(in lch, var(--c-secondary) 80%, var(--c-grey00) 20%);
                }
            }
        }
    }

    input {
        position: relative;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked {
            & ~ .radio-button__checkmark {
                background-color: var(--c-secondary);

                &::after {
                    left: 22px;
                }
            }
        }
    }
}

.radio-button__checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 48px;
    background-color: var(--c-grey20);
    transition: background-color 0.2s ease;
    border-radius: 50px;

    .radio-button:hover & {
        background-color: color-mix(in lch, var(--c-grey20) 95%, var(--c-grey100) 5%);
    }

    &::after {
        content: '';
        position: absolute;
        left: 4px;
        right: auto;
        top: 4px;
        height: calc(100% - 8px);
        aspect-ratio: 1;
        display: block;
        background-color: var(--c-grey00);
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        transition: left 0.2s ease;
    }
}
</style>
