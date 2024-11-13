<script lang="ts" setup>
import type { BtnModifier } from '~/types/Button';

type Props = {
    modifiers: BtnModifier[];
    btnType?: 'button' | 'submit';
};

const props = withDefaults(defineProps<Props>(), {
    btnType: 'button',
});

const { modifiers } = useModifiers(
    'btn',
    computed(() => props.modifiers),
);
</script>

<template>
    <button class="btn" :class="modifiers" :type="btnType" :disabled="modifiers.includes('disabled')">
        <slot></slot>
    </button>
</template>
