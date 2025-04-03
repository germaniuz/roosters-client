import * as v from 'valibot';

export const AddressFieldsSchema = v.object({
    city: v.pipe(v.string(), v.nonEmpty('Укажите город')),
    street: v.pipe(v.string(), v.nonEmpty('Укажите улицу')),
    house: v.nonNullable(v.pipe(v.string(), v.nonEmpty('Укажите дом')), 'Укажите дом'),
    location: v.object({
        latitude: v.nonNullable(v.number(), 'Укажите долготу'),
        longitude: v.nonNullable(v.number(), 'Укажите долготу'),
    }),
});

export type AddressFields = v.InferOutput<typeof AddressFieldsSchema>;

export type Address = {
    city: string;
    street: string;
    house: string;
    location: {
        latitude: number;
        longitude: number;
    };
};

export type DadataSuggestionResponse = {
    suggestions: DadataSuggestion[];
};

export type DadataSuggestion = {
    data: {
        postal_code: string;
        country: string;
        country_iso_code: string;
        federal_district: string;
        region: string;
        region_iso_code: string;
        region_type: string;
        region_type_full: string;
        region_with_type: string;
        area: string;
        area_type: string;
        area_type_full: string;
        area_with_type: string;
        city: string;
        city_area: string;
        city_district: string;
        city_district_type: string;
        city_district_type_full: string;
        city_district_with_type: string;
        city_type: string;
        city_type_full: string;
        city_with_type: string;
        settlement: string;
        settlement_type: string;
        settlement_type_full: string;
        settlement_with_type: string;
        locality: string;
        street: string;
        street_type: string;
        street_type_full: string;
        street_with_type: string;
        house: string;
        block_type: string;
        block: string;
        envelope_index: string;
        kladr_id: string;
        fias_id: string;
        fias_level: string;
        fias_code: string;
        geo_lat: string;
        geo_lon: string;
        beltway_hit: string;
        metro: string;
        qc: string;
        qc_geo: string;
        unparsed_parts: string;
        source: string;
    };
    unrestricted_value: string;
    value: string;
};
