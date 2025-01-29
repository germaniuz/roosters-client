<script setup lang="ts"></script>

<template>
    <div class="promocode">
        <span>Есть промокод?</span>
        <FormInput placeholder="Введите промокод" class="promocode__input" />
        <div class="promocode__login">
            Промокоды и бонусные баллы действуют только для авторизованных пользователей.
            <a href="#">Войти</a>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.promocode {
    max-width: 350px;
    font-size: functions.rem(14);
    line-height: functions.rem(17);
    font-weight: 400;
    font-family: var(--f-base);

    span {
        display: block;
        color: var(--c-grey80);

        @include media.lg-up {
            font-size: functions.rem(16);
            line-height: functions.rem(19);
        }
    }
}

.promocode__login {
    color: var(--c-grey60);
    margin-bottom: 60px;

    @include media.md-up {
        margin-bottom: 30px;
    }

    a {
        color: var(--c-secondary);
        text-decoration: underline;
        transition: all 0.1s ease-in;

        &:hover {
            color: var(--c-primary);
        }
    }
}

.promocode__input {
    margin-block: 15px;
}
</style>
