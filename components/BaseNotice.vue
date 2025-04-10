<script setup lang="ts"></script>

<template>
    <div class="notice">
        <slot />
    </div>
</template>
<style scoped lang="scss">
.notice {
    text-align: center;
    border: 1px dashed var(--c-secondary);
    padding: 5px 10px;
    margin-block: -10px 40px;
    border-radius: var(--b-radius-md);
    font-weight: 300;
    color: var(--c-grey70);

    :deep(a) {
        color: var(--c-secondary);

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
