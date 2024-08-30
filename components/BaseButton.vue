<script lang="ts" setup>
import type { ButtonModifier } from '~/types/Button';

type Props = {
    modifiers: ButtonModifier[] | ButtonModifier;
    btnType?: 'button' | 'submit';
};

const props = withDefaults(defineProps<Props>(), {
    btnType: 'button',
});

const modifiers = computed(() => {
    // TODO: JS refactor after ProductCard Megred
    return typeof props.modifiers === 'string'
        ? props.modifiers
        : props.modifiers.map((modifier) => 'btn--' + modifier).join(' ');
});
</script>

<template>
    <button class="btn" :class="modifiers" :type="btnType">
        <slot></slot>
    </button>
</template>
