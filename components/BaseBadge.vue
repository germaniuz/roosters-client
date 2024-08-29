<script setup lang="ts">
type Props = {
    image: string
}

defineProps<Props>();
</script>

<template>
    <div class="badge">
        <img :src="image" alt="">
    </div>
</template>

<style scoped lang="scss">

.badge {
    position: absolute;
    max-height: 27px;
    width: auto;
    top: 0;
    right: 0;
}
</style>