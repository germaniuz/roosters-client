import * as v from 'valibot';
import type { InferOutput } from 'valibot';

export const RequestFromSchema = v.object({
    name: v.string('Введите имя телефона'),
    companyName: v.string('Введите имя компании'),
    phone: v.custom<string>((input: any) => /^\+\d{11}$/.test(input), 'Введите корректный номер телефона'),
    email: v.union([v.pipe(v.string(), v.email()), v.literal('')]),
});

export type RequestFrom = InferOutput<typeof RequestFromSchema>;
