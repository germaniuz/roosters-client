import * as v from 'valibot';
import type { InferOutput } from 'valibot';

export const RequestServiceFieldsSchema = v.object({
    name: v.string('Введите имя телефона'),
    companyName: v.string('Введите имя компании'),
    phone: v.custom<string>((input: unknown) => {
        return typeof input === 'string' ? /^\+\d{11}$/.test(input) : false;
    }, 'Введите корректный номер телефона'),
    email: v.union([v.pipe(v.string(), v.email()), v.literal('')]),
});

export const RequestDistributorFieldsSchema = v.object({
    name: v.string('Введите имя телефона'),
    companyName: v.string('Введите имя компании'),
    phone: v.custom<string>((input: unknown) => {
        return typeof input === 'string' ? /^\+\d{11}$/.test(input) : false;
    }, 'Введите корректный номер телефона'),
    email: v.union([v.pipe(v.string(), v.email()), v.literal('')]),
    offer: v.string('Введите предлагаемая продукцию или оборудование'),
    text: v.nullish(v.string()),
});

export type RequestServiceFields = InferOutput<typeof RequestServiceFieldsSchema>;
export type RequestDistributorFields = InferOutput<typeof RequestDistributorFieldsSchema>;
