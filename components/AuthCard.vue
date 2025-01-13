<script setup lang="ts">
import { vMaska } from 'maska/vue';
import UserAgreement from '~/components/form/UserAgreement.vue';
import { SEND_SMS_CODE } from '~/gql/mutations/auth';
import type { BtnModifier } from '~/types/Button';
import { AuthFieldsSchema, type AuthFields } from '~/types/Auth';
import useValidateFormData from '~/composables/useValidateFormData';
import { flatten } from 'valibot';

const emit = defineEmits(['openCodeVerificationDialog']);

const phoneNumber = ref<string>('');
const userAgreementChecked = ref<boolean>(false);

const authFields = computed<AuthFields>(() => {
    return {
        phone: '+' + phoneNumber.value.replace(/\D/g, ''),
        userAgreement: userAgreementChecked.value,
    };
});

const { validate, formErrors } = useValidateFormData<AuthFields>(authFields, AuthFieldsSchema);
const { mutate } = useMutation(SEND_SMS_CODE);

const btnModifiers = computed(() => {
    const modifiers: Array<BtnModifier> = ['primary'];
    if (!userAgreementChecked.value) {
        modifiers.push('disabled');
    }

    return modifiers;
});

const getCode = async () => {
    const result = validate();
    if (result.success) {
        const smsResponse = await mutate({
            phone: authFields.value.phone,
        });
        if (smsResponse?.data?.sendClientSmsCode) {
            emit('openCodeVerificationDialog', authFields.value.phone);
        }
    } else {
        console.error({ ...flatten(result.issues).nested });
    }
};
</script>

<template>
    <div class="auth-card">
        <div class="auth-card__title">Вход</div>
        <div class="auth-card__description">
            Подарим купон на день рождение, дадим бонусы за заказы и расскажем об акциях :)
        </div>
        <FormInput
            v-model="phoneNumber"
            v-maska="'+7 (9##) ### ##-##'"
            placeholder="+7 (___) ___ __-__"
            name="phone"
            :errors="formErrors?.phone"
        />
        <BaseButton :modifiers="btnModifiers" class="auth-card__button" @click.prevent="getCode"
            >Отправить код
        </BaseButton>
        <!--        TODO: refactor checkboxes-->
        <UserAgreement
            :model-value="userAgreementChecked"
            :errors="formErrors?.userAgreement"
            @update:model-value="userAgreementChecked = $event"
        />
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.auth-card {
    width: 100%;

    @include media.md-up {
        max-width: 450px;
    }
}

.auth-card__title {
    color: var(--c-grey80);
    font-family: var(--f-base);
    font-size: functions.rem(24);
    font-weight: 600;
    line-height: normal;
    margin-bottom: 15px;

    @include media.lg-up {
        font-size: functions.rem(28);
        margin-bottom: 20px;
    }
}

.auth-card__description {
    color: var(--c-grey60);
    font-family: var(--f-base);
    font-size: functions.rem(14);
    font-weight: 400;
    line-height: normal;
    margin-bottom: 30px;

    @include media.lg-up {
        margin-bottom: 40px;
    }
}

.auth-card__button {
    width: 100%;
    margin-bottom: 15px;
    margin-top: 20px;

    @include media.lg-up {
        margin-top: 30px;
    }
}
</style>
