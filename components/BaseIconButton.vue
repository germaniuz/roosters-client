<script setup lang="ts">
import type { BtnModifier } from '../types/Button';

type Props = {
    icon: string;
    modifiers?: BtnModifier[];
};

defineProps<Props>();
</script>

<template>
    <BaseButton :modifiers="modifiers ? [...modifiers, 'single-icon'] : ['single-icon']">
        <BaseIcon :name="icon" />
    </BaseButton>
</template>

<style scoped lang="ts"></style>
