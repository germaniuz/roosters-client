import type { LngLat } from '@yandex/ymaps3-types';

export type Geozone = {
    id: number;
    name: string;
    polygon: LngLat[];
    color: string;
    delivery_time: number;
    day_delivery_cost: number;
    night_delivery_cost: number;
    isActive: boolean;
};
