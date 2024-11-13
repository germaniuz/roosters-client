<script setup lang="ts">
import type { BtnModifier } from '~/types/Button';

type Props = {
    modifiers: Array<BtnModifier>;
    linkTo: string;
};

const props = withDefaults(defineProps<Props>(), {});

const modifiers = props.modifiers.map((item) => {
    return `btn--${item}`;
});
</script>

<template>
    <NuxtLink :class="`btn ${modifiers.join(' ')}`" :to="linkTo">
        <slot />
    </NuxtLink>
</template>
