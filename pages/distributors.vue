<script lang="ts" setup>
import BaseButton from '~/components/BaseButton.vue';
import { type RequestDistributorFields } from '~/types/RequestFrom';

const advantages = [
    'Мы стремимся к долгосрочным и честным отношениям.',
    'Возможность развиваться вместе с нами.',
    'Честные договоренности и своевременные оплаты.',
    'Персональный менеджер, который поможет на каждом этапе.',
];

const formFields = ref<RequestDistributorFields>({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    offer: '',
    text: '',
});
</script>

<template>
    <div class="container">
        <h1 class="h1">Поставщикам</h1>
        <div class="text-center service-r2b"><img src="/images/handshake.svg" alt="Рустерс" /></div>
        <h2 class="h2 h2--orange text-center text-uppercase">Сотрудничество с нами</h2>
        <p class="text-center service__text">
            Мы ищем надежных поставщиков, которые готовы предложить качественные продукты и услуги. Если вам интересно
            сотрудничество, будем рады обсудить детали
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
            <FormInput
                v-model="formFields.offer"
                name="offer"
                placeholder="Предлагаемая продукция / тип оборудования"
            />
            <FormTextarea v-model="formFields.text" />
            <BaseButton :modifiers="['primary']" class="service-form__btn">Отправить</BaseButton>
            <p class="text-center text-small form__notice">
                Продолжая, вы соглашаетесь со сбором и обработкой персональных данных, пользовательским соглашением, а
                также на получением рекламных сообщений
            </p>
        </form>
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
