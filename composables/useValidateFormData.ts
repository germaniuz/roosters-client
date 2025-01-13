import { type BaseIssue, type BaseSchema, flatten, safeParse } from 'valibot';
import type { Ref, UnwrapRef } from 'vue';

export default function useValidateFormData<T>(
    fields: Ref<T | null>,
    schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
) {
    type FormErrors = { [key in keyof T]?: [string, ...string[]] };

    const authData = fields;
    const formErrors = ref<FormErrors>({});

    const validate = () => {
        const result = safeParse(schema, authData.value);
        if (result.success) {
            formErrors.value = {} as UnwrapRef<FormErrors>;
        } else {
            formErrors.value = { ...flatten<typeof schema>(result.issues).nested } as UnwrapRef<FormErrors>;
        }

        return result;
    };

    return { formErrors, validate };
}
