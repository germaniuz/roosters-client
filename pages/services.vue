<script lang="ts" setup>
import BaseButton from '~/components/BaseButton.vue';
import { type RequestServiceFields } from '~/types/RequestFrom';
import PopularItems from '~/components/PopularItems.vue';

const advantages = [
    'Организация корпоративного питания с доставкой',
    'Использование только высококачественных ингредиентов',
    'Личный менеджер для оперативного и удобного оформления заказов',
    'Гибкие объемы заказов — от небольших ланчей до крупных банкетов',
];

const formFields = ref<RequestServiceFields>({
    name: '',
    companyName: '',
    phone: '',
    email: '',
});
</script>

<template>
    <div class="container">
        <h1 class="h1">Услуги</h1>
        <div class="text-center service-r2b"><img src="/images/r2b.svg" alt="Рустерс" /></div>
        <h2 class="h2 text-center text-uppercase">Корпоративные заказы для вашей компании</h2>
        <p class="text-center service__text">
            Поделитесь своими впечатлениями о нашем сервисе и помогите нам стать лучше. Оставьте отзыв и расскажите, что
            вам понравилось, а что можно улучшить!
        </p>
        <div class="service__advantages">
            <div class="text-center service-tie"><img src="/images/frame-tie.svg" alt="Рустерс" /></div>
            <div class="card card--grey service-card" v-for="advantage in advantages" :key="advantage">
                <img src="/images/check-orange-icon.svg" :alt="advantage" />
                <span>{{ advantage }}</span>
            </div>
        </div>
        <div class="service__arrow-down text-center">
            <img src="/images/arrow-down.svg" alt="next to" />
        </div>
        <form class="card card--shadows service-form">
            <h3 class="h3 text-center">Заполните заявку, и наши менеджеры свяжутся с вами</h3>
            <FormInput v-model="formFields.name" name="name" placeholder="Ваше имя" />
            <FormInput v-model="formFields.companyName" name="company-name" placeholder="Название компании" />
            <FormInput v-model="formFields.phone" name="phone" placeholder="Телефон" />
            <FormInput v-model="formFields.email" name="email" placeholder="Ваш email" />
            <BaseButton :modifiers="['primary']" class="service-form__btn">Отправить</BaseButton>
            <p class="text-center text-small form__notice">
                Продолжая, вы соглашаетесь со сбором и обработкой персональных данных, пользовательским соглашением, а
                также на получением рекламных сообщений
            </p>
        </form>
        <PopularItems />
    </div>
</template>

<style lang="scss" scoped>
@use 'assets/styles/helpers/functions';
@use 'assets/styles/helpers/media';

.service-r2b {
    margin-bottom: 30px;

    img {
        width: 110px;
    }
}

.service__text {
    max-width: 600px;
    margin-inline: auto;
    color: var(--c-grey70);
}

.service__advantages {
    margin-block: 60px;
    display: grid;
    gap: 20px;
    max-width: 1400px;
    margin-inline: auto;

    @include media.md-only {
        grid-template-columns: 1fr 1fr;
    }

    @include media.xl-up {
        grid-template-columns: 1fr 340px 1fr;
        grid-template-rows: auto auto;
        gap: 40px 20px;
    }

    & > * {
        @include media.xl-up {
            min-width: 0;
        }
    }
}

.service-tie {
    @include media.md-down {
        width: 100%;
        max-width: 300px;
        margin-inline: auto;
        grid-column: span 2;
    }

    @include media.lg-down {
        margin-bottom: 40px;
    }

    @include media.lg-only {
        width: 340px;
    }

    @include media.xl-up {
        grid-column: 2 / 3;
        grid-row: 1 / -1;
        align-self: center;
    }

    img {
        width: 100%;
        object-fit: contain;
    }
}

.service-card {
    display: flex;
    align-items: center;
    gap: 20px;
}

.service__arrow-down {
    margin-block: 20px;

    img {
        width: 58px;
    }
}

.service-form {
    margin-top: 30px;
    max-width: 800px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @include media.md-up {
        margin-block: 30px 60px;
    }
}

.service-form__btn {
    width: 100%;
    max-width: 450px;
    margin-inline: auto;
    margin-top: 20px;
}
</style>
