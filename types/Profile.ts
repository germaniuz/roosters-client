import * as v from 'valibot';
import type { InferOutput } from 'valibot';

export const ProfileSchema = v.object({
    id: v.optional(v.number()),
    name: v.nullish(v.string()),
    lastname: v.nullish(v.string()),
    phone: v.string(),
    email: v.nullish(v.pipe(v.string(), v.email())),
    avatar: v.nullish(
        v.pipe(
            v.blob('Добавьте файл'),
            v.mimeType(
                ['image/jpeg', 'image/png', 'image/webp'],
                'Недопустимый формат изображения. Допустимые форматы: jpg, png, webp',
            ),
            v.maxSize(1024 * 1024 * 10, 'Размер файла превышает 10МБ'),
        ),
    ),
    birthday: v.nullish(v.string()),
    gender: v.nullish(v.string()),
    is_active: v.boolean(),
});

export type Profile = InferOutput<typeof ProfileSchema>;

export type ClientProfile = {
    clientProfile: Profile;
};

export type UserGender = 'male' | 'female';
