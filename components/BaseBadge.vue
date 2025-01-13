<script setup lang="ts">
type Props = {
    image: string;
};

defineProps<Props>();
</script>

<template>
    <div class="badge">
        <img :src="image" alt="" />
    </div>
</template>

<style scoped lang="scss">
.badge {
    position: absolute;
    height: 27px;
    width: auto;
    top: 0;
    right: 0;
    overflow: hidden;

    img {
        height: 100%;
        width: auto;
        object-fit: contain;
    }
}
</style>
