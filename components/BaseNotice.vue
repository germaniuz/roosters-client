<script setup lang="ts"></script>

<template>
    <div class="notice"><slot /></div>
</template>
<style scoped lang="scss">
.notice {
    text-align: center;
    border: 2px dashed var(--c-primary);
    padding: 5px 10px;
    margin-block: -10px 40px;
    border-radius: var(--b-radius-md);
    font-weight: 500;
    color: var(--c-grey80);

    :deep(a) {
        color: var(--c-primary);

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
