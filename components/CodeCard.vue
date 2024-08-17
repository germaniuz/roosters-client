<script setup lang="ts">
import { vMaska } from "maska/vue"
import UserAgreement from '~/components/form/UserAgreement.vue';

const authCode = ref<string>('');
</script>

<template>
    <div class="card code-card">
        <div class="code-card__title">Подтвердите номер</div>
        <div class="code-card__description">СМС с кодом было отправлено на указанный вами номер</div>
        <FormInput v-model="authCode" placeholder="" v-maska="'####'" name="code"/>
        <BaseButton :modifiers="['primary']" class="code-card__button">Получить код снова</BaseButton>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.code-card {
    border: 1px solid var(--c-grey40);

    @include media.md-up {
        max-width: 550px;
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

.code-card__button {
    width: 100%;
    margin-bottom: 15px;
    margin-top: 20px;

    @include media.lg-up {
        margin-top: 30px;
    }
}
</style>