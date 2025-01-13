import * as v from 'valibot';

export const AuthFieldsSchema = v.object({
    phone: v.custom<string>((input: unknown) => {
        return typeof input === 'string' ? /^\+\d{11}$/.test(input) : false;
    }, 'Введите корректный номер телефона'),
    userAgreement: v.literal(true, 'Подтвердите свое согласие на обработку персональных данных'),
});

export type AuthFields = {
    phone: string;
    userAgreement: boolean;
};
