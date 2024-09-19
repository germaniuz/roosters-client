<script setup lang="ts">
import { vMaska } from "maska/vue"
import UserAgreement from '~/components/form/UserAgreement.vue';

const phoneNumber = ref<string>('');
const userAgreementChecked = ref<boolean>(false);
</script>

<template>
    <div class="card auth-card">
        <div class="auth-card__title">Вход</div>
        <div class="auth-card__description">Подарим купон на день рождение, дадим бонусы за заказы и расскажем об акциях :)</div>
        <FormInput v-model="phoneNumber" placeholder="+7 (___) ___ __-__" v-maska="'+7 (###) ### ##-##'" name="phone"/>
        <BaseButton :modifiers="['primary']" class="auth-card__button">Отправить код</BaseButton>
        <UserAgreement :model-value="userAgreementChecked"/>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.auth-card {
    border: 1px solid var(--c-grey40);

    @include media.md-up {
        max-width: 550px;
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