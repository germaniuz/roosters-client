<script setup lang="ts">
import {
    YandexMap,
    YandexMapControls,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultMarker,
    type YandexMapDefaultMarkerSettings,
    YandexMapDefaultSchemeLayer,
    YandexMapListener,
    YandexMapZoomControl,
} from 'vue-yandex-maps';
import type { DomEventHandler, YMap } from '@yandex/ymaps3-types';
import type { YMapLocationRequest } from '@yandex/ymaps3-types/imperative/YMap';

const emit = defineEmits(['setCoordinates']);

const map = shallowRef<YMap | null>(null);
const marker = shallowRef<YandexMapDefaultMarkerSettings | null>(null);
const LOCATION: YMapLocationRequest = {
    center: [44.50183, 48.71939], // starting position [lng, lat]
    zoom: 14, // starting zoom
};

const logMapClick: DomEventHandler = async (object, event) => {
    const coordinates = event.coordinates;
    marker.value = {
        coordinates,
    };
    emit('setCoordinates', event.coordinates);
};
</script>

<template>
    <div class="user-address-map">
        <YandexMap
            v-model="map"
            height="100%"
            :settings="{
                location: LOCATION,
            }"
            width="100%"
        >
            <YandexMapDefaultSchemeLayer />
            <YandexMapDefaultFeaturesLayer />
            <YandexMapControls :settings="{ position: 'right' }">
                <YandexMapZoomControl />
            </YandexMapControls>
            <YandexMapDefaultMarker v-if="marker" :settings="marker" />
            <YandexMapListener :settings="{ onClick: logMapClick }" />
        </YandexMap>
    </div>
</template>

<style scoped lang="scss">
.user-address-map {
    width: 500px;
    height: 100%;
    border-radius: var(--b-radius-lg);
    overflow: clip;
}

.address-icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 62px;
    height: 75px;

    &:hover {
        cursor: pointer;
    }

    &::before {
        border-radius: 50%;
        background: var(--c-grey00);
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 50%;
        translate: -50% 6px;
        width: 50px;
        height: 50px;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
        z-index: var(--z-middle);
    }

    img {
        position: relative;
        width: 40px;
        margin-top: 10px;
        height: auto;
        z-index: var(--z-middle);
    }
}

.address-icon__pin {
    width: 62px;
    height: 75px;
    fill: var(--c-secondary);
    position: absolute;
    top: 0;
    left: 0;
    z-index: var(--z-middle-bottom);

    .address-icon--active & {
        fill: var(--c-primary);
    }
}
</style>
