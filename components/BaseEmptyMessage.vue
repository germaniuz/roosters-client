<script setup lang="ts">
type Props = {
    message: string;
};

defineProps<Props>();
</script>

<template>
    <div class="empty-list">{{ message }}</div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/functions';

.empty-list {
    text-align: center;
    border: 1px dashed var(--c-grey30);
    border-radius: var(--b-radius);
    padding: 20px;
    font-size: functions.rem(18);
    color: var(--c-grey50);
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-weight: 300;
}
</style>
