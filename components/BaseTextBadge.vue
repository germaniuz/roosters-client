<script setup lang="ts">
type Modifier = 'sm' | 'secondary';

type Props = {
    modifiers?: Array<Modifier>;
};

const props = withDefaults(defineProps<Props>(), {
    modifiers: () => [],
});

const modifiers = computed(() => {
    return props.modifiers.map((modifier) => 'badge--' + modifier).join(' ');
});
</script>

<template>
    <div class="badge" :class="modifiers">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.badge {
    border: 1px solid var(--c-grey20);
    color: var(--c-red90);
    padding: 10px;
    display: inline-block;
    border-radius: var(--b-radius-md);

    &--sm {
        font-size: functions.rem(12);
        padding: 2px 8px;
        line-height: 1;
    }

    &--secondary {
        color: var(--c-secondary);
        background-color: var(--c-secondary-extra-light);
        border-color: var(--c-secondary-extra-light);
    }
}
</style>
