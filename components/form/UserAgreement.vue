<script setup lang="ts">
type Props = {
    modelValue: boolean;
};
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const agreement = ref(props.modelValue);

const label =
    'Я даю согласие на обработку персональных данных и соглашаюсь с <a href="#" class="link link--no-wrap">Политикой конфиденциальности</a>';

watchEffect(() => {
    emit('update:modelValue', agreement.value);
});
</script>

<template>
    <div class="form-control">
        <FormCheckbox v-model="agreement" name="agreement" :label="label" />
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
}
</style>
