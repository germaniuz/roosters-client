<script setup lang="ts">
type Props = {
    modelValue: boolean;
    label: string;
    name: string;
};

const emit = defineEmits(['update:modelValue']);

defineProps<Props>();
</script>

<template>
    <div class="form-control">
        <label class="checkbox">
            <input
                :id="name"
                :name="name"
                type="checkbox"
                :checked="modelValue"
                @change="emit('update:modelValue', ($event.currentTarget as HTMLInputElement).checked)"
            />
            <span class="checkbox__checkmark"></span>
            <span class="checkbox-label" v-html="label"></span>
        </label>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.checkbox {
    display: flex;
    gap: 10px;
    align-items: center;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: max-content;
}

.checkbox input {
    position: relative;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    display: none;

    & ~ .checkbox__checkmark {
        .checkbox:hover & {
            background-color: var(--c-grey20);
        }
    }

    &:checked {
        & ~ .checkbox__checkmark {
            background-color: var(--c-secondary);
            border-color: var(--c-secondary);
            box-shadow: var(--shadow-xs);

            &::after {
                content: '\e81a';
            }
        }
    }
}

.checkbox__checkmark {
    position: relative;
    height: 18px;
    flex: 0 0 18px;
    width: 18px;
    transition: all 0.25s ease;
    border: 2px solid var(--c-secondary);
    border-radius: var(--b-radius-xxs);

    &::after {
        content: '';
        font-family: var(--f-icons);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: functions.rem(14);
        color: var(--c-grey00);
    }
}

.checkbox-label {
    color: var(--c-text-primary);
    font-size: functions.rem(15);
    line-height: functions.rem(22);
}
</style>
