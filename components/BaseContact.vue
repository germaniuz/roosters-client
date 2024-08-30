<script setup lang="ts">
import type { Contact } from '~/types/Contact';

type Props = {
    image: string,
    text: string,
    subtext?: string
    type?: Contact
}

const props = defineProps<Props>();

const linkType = computed(() => {
    if (props.type === 'email') {
        return 'mailto:'
    } if (props.type === 'phone') {
        return 'tel:'
    } else return '';
})
</script>

<template>
    <div class="contact">
        <img :src="image" alt="" class="contact__image">
        <a class="contact__text" :href="linkType + text">{{ text }}</a>
        <div v-if="subtext" class="contact__subtext">{{ subtext }}</div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.contact {
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-template-rows: repeat(2, auto);
    align-items: center;
    grid-column-gap: 10px;
    grid-row-gap: 2px;

    img {
        grid-column: 1;
        grid-row: 1/-1;
        width: 100%;
        height: 100%;
    }
}

.contact__text {
    color: var(--c-grey70);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    font-weight: 600;
    line-height: normal;
    transition: all .2s linear;

    &:hover {
        color: var(--c-grey50);
    }
}

.contact__subtext {
    color: var(--c-grey40);
    font-family: var(--f-base);
    font-size: functions.rem(12);
    font-weight: 400;
    line-height: normal;
}
</style>