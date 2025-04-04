<script setup lang="ts">
import { vMaska } from 'maska/vue';
import { VERIFY_SMS_CODE } from '~/gql/mutations/auth';
import { useMutation } from 'villus';

type Props = {
    phone: string;
};

const props = defineProps<Props>();

const { token, isCodeVerificationDialogActive } = storeToRefs(useProfileStore());
const cookieToken = useCookie('villus:default.token');

const authCode = ref<Array<string>>(['', '', '', '']);
const codeCardInputs = ref();

const isCodeFilled = computed(() => {
    return !authCode.value.includes('');
});

onMounted(() => {
    codeCardInputs.value.focus();
});

onBeforeUnmount(() => {
    codeCardInputs.value.removeEventListener('input', (e: InputEvent) => handleInput(e));
    codeCardInputs.value.removeEventListener('keydown', (e: KeyboardEvent) => handleBackspace(e));
});

const handleInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;

    if (target) {
        const hasValue = target.value;
        const inputFormControl = target.parentNode as HTMLDivElement;
        const hasNextSibling = inputFormControl.nextElementSibling;
        const hasNextSiblingInput = hasNextSibling && inputFormControl.nextElementSibling.querySelector('input');

        if (hasValue && hasNextSiblingInput) {
            inputFormControl.nextElementSibling.querySelector('input')?.focus();
        }
    }
};

const handleBackspace = (e: KeyboardEvent) => {
    if (e.key == 'Backspace') {
        const target = e.target as HTMLInputElement;
        const inputFormControl = target.parentNode as HTMLDivElement;
        const hasPrevSibling = inputFormControl.previousElementSibling;
        const hasPrevSiblingInput = hasPrevSibling && inputFormControl.previousElementSibling.querySelector('input');

        if (hasPrevSibling && hasPrevSiblingInput) {
            if (!inputFormControl.nextElementSibling && authCode.value[authCode.value.length - 1]) {
                authCode.value[authCode.value.length - 1] = '';
            } else {
                inputFormControl.previousElementSibling.querySelector('input')?.focus();
            }
        }
    }
};

const { execute: verifySmsCode } = useMutation(VERIFY_SMS_CODE);

watchEffect(async () => {
    if (codeCardInputs.value) {
        codeCardInputs.value.addEventListener('input', (e: InputEvent) => handleInput(e));
        codeCardInputs.value.addEventListener('keydown', (e: KeyboardEvent) => handleBackspace(e));
    }
    if (isCodeFilled.value) {
        try {
            const verifyResponse = await verifySmsCode({
                phone: props.phone,
                code: authCode.value.join(''),
            });
            if (verifyResponse?.data?.verifyClientSmsCode.token) {
                cookieToken.value = verifyResponse.data.verifyClientSmsCode.token;
                token.value = verifyResponse.data.verifyClientSmsCode.token;
                isCodeVerificationDialogActive.value = false;
                authCode.value = ['', '', '', ''];
            }
        } catch (error) {
            console.error(error);
        }
    }
});
</script>

<template>
    <div class="code-card">
        <div class="code-card__title">Подтвердите номер</div>
        <div class="code-card__description">СМС с кодом было отправлено на указанный вами номер</div>
        <div ref="codeCardInputs" class="code-card__inputs">
            <FormInput
                v-model="authCode[0]"
                v-maska="'#'"
                class="code-card__input"
                placeholder=""
                name="code-digit-1"
            />
            <FormInput
                v-model="authCode[1]"
                v-maska="'#'"
                class="code-card__input"
                placeholder=""
                name="code-digit-2"
            />
            <FormInput
                v-model="authCode[2]"
                v-maska="'#'"
                class="code-card__input"
                placeholder=""
                name="code-digit-3"
            />
            <FormInput
                v-model="authCode[3]"
                v-maska="'#'"
                class="code-card__input"
                placeholder=""
                name="code-digit-4"
            />
        </div>
        <BaseButton :modifiers="['primary']" class="code-card__button">Получить код снова</BaseButton>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.code-card {
    @include media.md-up {
        max-width: 450px;
    }
}

.code-card__title {
    color: var(--c-grey80);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(24);
    font-weight: 600;
    line-height: normal;
    margin-bottom: 15px;

    @include media.lg-up {
        font-size: functions.rem(28);
        margin-bottom: 20px;
    }
}

.code-card__description {
    color: var(--c-grey60);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(14);
    font-weight: 400;
    line-height: normal;
    margin-bottom: 30px;

    @include media.lg-up {
        margin-bottom: 40px;
    }
}

.code-card__inputs {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: min-content;
    margin-inline: auto;
}

.code-card__button {
    width: 100%;
    margin-bottom: 15px;
    margin-top: 20px;

    @include media.lg-up {
        margin-top: 30px;
    }
}

.code-card__input {
    min-width: 50px;
}
</style>
