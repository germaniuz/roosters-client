<script setup lang="ts"></script>

<template>
    <div class="stories">
        <div class="story">story 1</div>
        <div class="story">story 2</div>
    </div>
</template>

<style scoped lang="scss">
.stories {
    display: flex;
    gap: 12px;
}

.story {
    flex: 0 0 110px;
    width: 110px;
    height: 140px;
    border-radius: var(--b-radius);
    background: var(--c-grey20);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--c-grey60);
}
</style>
