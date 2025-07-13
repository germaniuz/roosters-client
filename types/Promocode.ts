import * as v from 'valibot';

export const PromocodeSchema = v.object({
    code: v.pipe(v.string(), v.nonEmpty('Введите промокод')),
});

export type PromocodeFields = v.InferOutput<typeof PromocodeSchema>;

export type Promocode = {
    code: string;
};
