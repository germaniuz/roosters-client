<script setup lang="ts">
type Props = {
    icon: string;
    downloadText: string;
    storeName: string;
};
defineProps<Props>();
</script>

<template>
    <div class="app-store-btn">
        <BaseIcon :name="icon" />
        <span class="app-store-btn__text">{{ downloadText }}</span>
        <span class="app-store-btn__title">{{ storeName }}</span>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.app-store-btn {
    display: inline-grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: repeat(2, auto);
    align-items: center;
    column-gap: 8px;
    border: 1px solid var(--c-grey70);
    padding: 7px 10px;
    border-radius: var(--b-radius-md);
    color: var(--c-grey70);
    cursor: pointer;

    i {
        font-size: functions.rem(25);
        grid-row: 1/-1;
        transition: all 0.2s ease;

        &:before {
            margin: unset;
        }
    }

    span {
        grid-column: 2;
    }

    &:hover {
        .icon-huawei {
            color: var(--c-huawei-hover);
        }

        .icon-appstore {
            color: var(--c-grey100);
        }

        .icon-playmarket {
            color: transparent;
            background: var(--c-playmarket-hover);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
}

.app-store-btn__text {
    font-size: functions.rem(8);
    line-height: 1;
    text-transform: uppercase;
}

.app-store-btn__title {
    font-size: functions.rem(18);
    line-height: 1;
}
</style>
