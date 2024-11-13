<script setup lang="ts">
import { vMaska } from 'maska/vue';
import { VERIFY_SMS_CODE } from '~/gql/mutations/auth';

type Props = {
    phone: string;
};

const props = defineProps<Props>();
const emit = defineEmits(['loggingIn']);
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

const { mutate: verifySmsCode } = useMutation(VERIFY_SMS_CODE);

const handleInput = (e: InputEvent) => {
    const target: HTMLInputElement = <HTMLInputElement>e.target;

    if (target) {
        const hasValue = target.value !== '';
        const inputFormControl: HTMLDivElement = <HTMLDivElement>target.parentNode;
        const hasNextSibling = inputFormControl.nextElementSibling;
        const hasNextSiblingInput = hasNextSibling && inputFormControl.nextElementSibling.querySelector('input');

        if (hasValue && hasNextSiblingInput) {
            inputFormControl.nextElementSibling.querySelector('input')?.focus();
        } else {
        }
    }
};

const handleBackspace = (e: KeyboardEvent) => {
    if (e.key == 'Backspace') {
        const target: HTMLInputElement = <HTMLInputElement>e.target;
        const inputFormControl: HTMLDivElement = <HTMLDivElement>target.parentNode;
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
                emit('loggingIn', verifyResponse.data.verifyClientSmsCode.token);
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
        <div class="code-card__inputs" ref="codeCardInputs">
            <FormInput
                class="code-card__input"
                v-model="authCode[0]"
                placeholder=""
                v-maska="'#'"
                name="code-digit-1"
            />
            <FormInput
                class="code-card__input"
                v-model="authCode[1]"
                placeholder=""
                v-maska="'#'"
                name="code-digit-2"
            />
            <FormInput
                class="code-card__input"
                v-model="authCode[2]"
                placeholder=""
                v-maska="'#'"
                name="code-digit-3"
            />
            <FormInput
                class="code-card__input"
                v-model="authCode[3]"
                placeholder=""
                v-maska="'#'"
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

.code-card__description {
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
