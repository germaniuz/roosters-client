<script setup lang="ts">
import type { ButtonModifier } from '~/types/Button';

type Props = {
    modifiers: Array<ButtonModifier>;
    linkTo: Object;
};

const props = withDefaults(defineProps<Props>(), {});

const modifiers = props.modifiers.map((item) => {
    return `btn--${item}`; // TODO: JS refactor after ProductCard Megred
});
</script>

<template>
    <NuxtLink :class="`btn ${modifiers.join(' ')}`" :to="linkTo">
        <slot />
    </NuxtLink>
</template>
