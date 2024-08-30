<script lang="ts" setup>
type BtnModifier = 'primary' | 'secondary' | 'success' | 'warning' | 'item' | 'grey' | 'sm' | 'lg' | 'xl' | 'icon';

type Props = {
    modifiers: BtnModifier[] | BtnModifier;
    btnType?: 'button' | 'submit';
};

const props = withDefaults(defineProps<Props>(), {
    btnType: 'button',
});

const modifiers = computed(() => {
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
