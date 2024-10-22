import * as v from 'valibot';
import type { InferOutput } from 'valibot';

export const ProfileSchema = v.object({
    id: v.number(),
    name: v.string(),
    email: v.pipe(v.string(), v.email()),
    avatar: v.string(),
    birthday: v.string(),
    gender: v.string(),
});

export type Profile = InferOutput<typeof ProfileSchema>;
