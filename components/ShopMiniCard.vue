<script setup lang="ts">
import type { Shop } from '~/types/Shop';

type Props = {
    shop: Shop;
    isActive?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
    isActive: false,
});

const todaySchedules = getTodaySchedule(props.shop);
const workingHours = todaySchedules.map((schedule) => {
    return schedule.time_start === '00:00:00' && schedule.time_end === '23:59:59'
        ? 'Круглосуточно'
        : schedule.time_start.slice(0, -3) + ' - ' + schedule.time_end.slice(0, -3);
});
</script>

<template>
    <div class="shop-mini-card" :class="{ 'shop-mini-card--active': isActive }">
        <div class="shop-mini-card__title"><i class="icon-ya-maps color-primary"></i> {{ shop.name }}</div>
        <div class="shop-mini-card__address">Невская, 2</div>
        <div class="shop-mini-card__schedule">{{ workingHours.join(', ') }}</div>
        <div class="shop-mini-card__icon" v-if="isActive"><i class="icon-check"></i></div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.shop-mini-card {
    border-radius: var(--b-radius-md);
    padding: 20px 60px 20px 20px;
    position: relative;

    &--active {
        border: 1px solid var(--c-secondary);
    }
}

.shop-mini-card__title {
    display: flex;
    gap: 4px;
    align-items: center;
    font-size: functions.rem(18);
    font-weight: 600;
    color: var(--c-secondary);
    margin-bottom: 10px;
}

.shop-mini-card__address {
    font-size: functions.rem(14);
    color: var(--c-grey50);
    margin-bottom: 5px;
}

.shop-mini-card__schedule {
    font-size: functions.rem(14);
    color: var(--c-grey50);
}

.shop-mini-card__icon {
    position: absolute;
    right: 0;
    top: 50%;
    translate: -18px -50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--c-primary);
    color: var(--c-grey00);
}
</style>
