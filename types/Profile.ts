import * as v from 'valibot';
import type { InferOutput } from 'valibot';

export const ProfileSchema = v.object({
    id: v.number(),
    name: v.nullish(v.string()),
    lastname: v.nullish(v.string()),
    phone: v.string(),
    email: v.nullish(v.pipe(v.string(), v.email())),
    avatar: v.nullish(v.string()),
    birthday: v.nullish(v.string()),
    gender: v.nullish(v.string()),
    is_active: v.boolean(),
});

export type Profile = InferOutput<typeof ProfileSchema>;
