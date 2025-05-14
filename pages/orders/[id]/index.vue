<script lang="ts" setup>
const route = useRoute();
const orderId = route.params.id;
</script>
<template>
    <div class="container">Order #{{ orderId }}</div>
</template>
