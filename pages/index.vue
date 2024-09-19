<script lang="ts" setup>
import BaseButton from '~/components/BaseButton.vue';

const radio = ref(false)
</script>
<template>
    <h1 class="h1">Главная</h1>
    <BaseButton :modifiers="['primary']">Btn</BaseButton>
    <FormRadioButton label="Radio btn" name="radio" v-model="radio"/>
    <AuthCard/>
    <CodeCard/>
</template>
