<script setup lang="ts">
type Props = {
    image: string;
    alt: string;
};

defineProps<Props>();
</script>

<template>
    <div class="badge">
        <img :src="image" :alt="alt" />
    </div>
</template>

<style scoped lang="scss">
.badge {
    height: 27px;
    width: auto;
    overflow: hidden;

    img {
        height: 100%;
        width: auto;
        object-fit: contain;
    }
}
</style>
