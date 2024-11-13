<script setup lang="ts">
type Props = {
    name: string,
    link: string
}

defineProps<Props>();
</script>

<template>
    <a :href="link" class="social">
        <BaseIcon :name="name"/>
    </a>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/mixins';

.social {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    border-radius: var(--b-radius-round);
    color: var(--c-grey00);
    cursor: pointer;
    transition: all .2s linear;

    &:has(> .icon-instagram) {
        @include mixins.gradient-hover(var(--c-instagram), var(--c-instagram-hover));
    }

    &:has(> .icon-vk) {
        background: var(--c-vk);

        &:hover {
            background: var(--c-vk-hover);
        }
    }

    .icon-instagram {
        &::after {
            content: '*';
            font-size: functions.rem(26);
            position: absolute;
            color: var(--c-primary);
            right: -8px;
            top: 2px;
        }
    }

    i {
        font-size: functions.rem(18);

    }

    .icon-vk {
        font-size: functions.rem(20);
        margin-top: 3px;
    }
}
</style>