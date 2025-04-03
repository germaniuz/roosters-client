<script setup lang="ts">
import type { AddressFields, DadataSuggestion, DadataSuggestionResponse } from '~/types/Address';
import { watchDebounced } from '@vueuse/core';

type Props = {
    coordinates: [number, number] | null;
    formErrors: Record<string, string[] | undefined>;
};
const props = defineProps<Props>();

const { app } = useRuntimeConfig();
const address = defineModel<AddressFields>({
    required: true,
});
const addressQuery = ref('');
const suggestions = ref<DadataSuggestion[]>([]);
const isResultActive = ref(true);
const resultContainer = useTemplateRef('resultContainer');

const setAddress = async (suggestion: DadataSuggestion) => {
    addressQuery.value = suggestion.value;
    address.value = {
        city: suggestion.data.city,
        street: suggestion.data.street,
        house: suggestion.data.house,
        location: {
            latitude: +suggestion.data.geo_lat,
            longitude: +suggestion.data.geo_lon,
        },
    };
};

useClickOutside(resultContainer, () => {
    isResultActive.value = false;
});

watchDebounced(
    addressQuery,
    async () => {
        // Make dadata request
        const res = await $fetch<DadataSuggestionResponse>(
            'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Token ' + app.DADATA_API_TOKEN,
                },
                body: {
                    query: addressQuery.value,
                    locations: [
                        {
                            region: 'Волгоградская',
                            city: 'Волгоград',
                        },
                    ],
                },
            },
        );

        if (res?.suggestions) {
            isResultActive.value = true;
            suggestions.value = res.suggestions;
        }
    },
    {
        debounce: 1000,
        maxWait: 5000,
    },
);

watchDebounced(
    () => props.coordinates,
    async () => {
        if (props.coordinates) {
            const res = await $fetch<DadataSuggestionResponse>(
                'http://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: 'Token ' + app.DADATA_API_TOKEN,
                    },
                    body: { lat: props.coordinates[1], lon: props.coordinates[0], radius_meters: 70 },
                },
            );
            if (res?.suggestions) {
                isResultActive.value = true;
                suggestions.value = res.suggestions;
            }
        }
    },
    {
        debounce: 700,
        maxWait: 3000,
    },
);

onMounted(() => {
    if (address.value.city) {
        addressQuery.value = address.value.city + ' ' + address.value.street + ' ' + address.value.house;
    }
});
</script>

<template>
    <div class="address-form">
        <FormInput v-model="addressQuery" placeholder="Введите адрес" name="address" :errors="formErrors.house" />
        <div v-if="suggestions.length && isResultActive" ref="resultContainer" class="result">
            <span v-for="item in suggestions" :key="item.data.fias_id" @click="setAddress(item)">{{ item.value }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/functions';

.address-form {
    margin-bottom: 20px;
    position: relative;
    z-index: var(--z-top-10);
}

.result {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-bottom-left-radius: var(--b-radius);
    border-bottom-right-radius: var(--b-radius);
    box-shadow: var(--shadow);
    padding: 10px 20px;
    margin-top: -20px;
    max-width: 790px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    translate: 0 100%;
    z-index: var(--z-top-10);
    background: var(--c-grey00);

    span {
        cursor: pointer;
        color: var(--c-grey70);
        font-size: functions.rem(14);
    }
}
</style>
