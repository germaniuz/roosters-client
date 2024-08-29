<script setup lang="ts">
type Props = {
    name: string;
};

defineProps<Props>();
</script>

<template>
    <i :class="`icon-${name}`"></i>
</template>
