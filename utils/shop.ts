import type { Shop } from '~/types/Shop';

export const getTodaySchedule = (shop: Shop) => {
    const today = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    return shop.pickup_schedule.filter((schedule) => schedule.day_slug === today);
};
