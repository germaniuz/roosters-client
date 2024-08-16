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
