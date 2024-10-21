<script lang="ts" setup>
import BaseOrderCard from '~/components/BaseOrderCard.vue';
import RadioButton from '~/components/form/RadioButton.vue';
import type { UserGender } from '~/types/Profile';

const mailingEmail = ref('');
const name = ref('');
const phone = ref('');
const email = ref('');
const birthday = ref('');
const gender = ref<UserGender>('male');

const userIsMale = ref<boolean>(true);
const userIsFemale = ref<boolean>(false);

const handleMaleCheckboxClick = () => {
    userIsMale.value = true;
    userIsFemale.value = false;
    gender.value = 'male';
};

const handleFemaleCheckboxClick = () => {
    userIsFemale.value = true;
    userIsMale.value = false;
    gender.value = 'female';
};

const savedAddresses = ref<Array<string>>(['Ул. Рабоче-Крестьянская 31', 'Улица Клавы Нечаевой, 4']);
</script>
<template>
    <div class="profile container container--sm">
        <h1 class="h1">Личный кабинет</h1>
        <div class="profile__user-grid">
            <div class="profile__user-welcome">
                <div class="profile__user-welcome-hello">Добрый день,</div>
                <div class="profile__user-welcome-name">
                    <div class="profile__user-welcome-icon">
                        <img src="/images/icons/avatar-dark.svg" alt="Profile" />
                    </div>
                    <span>Гость!</span>
                </div>
            </div>
            <div class="card card--p-md profile__user-points">
                <div class="profile__user-points-converting">1 балл Рустерс = 1 ₽</div>
                <span>Сейчас у вас</span>
                <div class="profile__user-points-balance">
                    150
                    <BaseIcon name="pizza-slice" />
                </div>
                <a class="link link--secondary" href="#">Как их использовать?</a>
            </div>
            <div class="card card--p-md card--grey profile__user-orders-history">
                <div class="text14 g50">Все заказы и начисления баллов</div>
                <span>История заказов</span>
                <BaseButton :modifiers="['secondary']">Посмотреть все</BaseButton>
            </div>
            <BaseOrderCard class="profile__user-order" />
        </div>
        <div class="profile__mailing">
            <div class="profile__mailing-radio-btn">
                <RadioButton name="profile-mailing" label="" />
                <span class="h2 h2--no-mb">Подписаться на рассылку</span>
            </div>
            <div class="profile__mailing-description">Получать персональные предложения, акции и новости.</div>
            <FormInput
                class="profile__mailing-mail"
                name="mailing-email"
                v-model="mailingEmail"
                placeholder="roosters@ya.ru"
            />
        </div>
        <div class="h2">Персональные акции</div>
        <div class="h2">Ваши адреса</div>
        <div class="profile__saved-addresses">
            <div v-for="savedAddress in savedAddresses" class="profile__saved-address">
                <BaseIcon class="profile__saved-address-icon" name="pin-scheme" />
                <div class="profile__saved-address-name">{{ savedAddress }}</div>
                <BaseIcon class="profile__saved-address-remove" name="close" />
            </div>
        </div>
        <div class="h2">Персональные данные</div>
        <div class="profile__personal-data">
            <div class="profile__personal-data-bonus">
                <div class="profile__personal-data-bonus-img">
                    <img src="/images/exclamation.webp" alt="" />
                </div>
                <div>
                    <div class="profile__personal-data-bonus-text">
                        Получите
                        <span>до 450 <BaseIcon name="pizza-slice" /></span>
                        за заполнение профиля!
                    </div>
                    <div class="profile__personal-data-bonus-subtext">Бонусами можно оплачивать заказы</div>
                </div>
            </div>
            <div class="profile__personal-data-image-block">
                <div class="profile__personal-data-image">
                    <img src="/images/icons/avatar-dark.svg" alt="Profile" />
                </div>
                <BaseButton :modifiers="['outline']">Изменить изображение</BaseButton>
            </div>
            <div class="profile__input">
                <FormInput name="name" v-model="name" placeholder="Имя" />
                <div class="profile__bonus">+50</div>
            </div>
            <div class="profile__input">
                <FormInput name="phone" v-model="phone" placeholder="Телефон" />
                <div class="profile__bonus">+50</div>
            </div>
            <div class="profile__input">
                <FormInput name="email" v-model="email" placeholder="Email" />
                <div class="profile__bonus">+50</div>
            </div>
            <div class="profile__input-label">Пол</div>
            <div class="profile__personal-data-gender">
                <FormCheckbox
                    v-model="userIsMale"
                    label="Мужской"
                    name="userIsMale"
                    @change="handleMaleCheckboxClick()"
                />
                <FormCheckbox
                    v-model="userIsFemale"
                    label="Женский"
                    name="userIsFemale"
                    @change="handleFemaleCheckboxClick()"
                />
            </div>
            <div class="profile__input-label">Дата рождения</div>
            <div class="profile__input">
                <FormInput name="birthday" v-model="birthday" placeholder="День рождения" />
                <div class="profile__bonus">+50</div>
            </div>
            <div class="profile__personal-data-btns">
                <BaseButton :modifiers="['primary']">Сохранить</BaseButton>
                <BaseButton :modifiers="['outline']">Выйти</BaseButton>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.profile__user-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
    margin-bottom: 40px;
    grid-template-areas:
        'user-welcome'
        'user-points'
        'user-orders-history'
        'user-order';

    @include media.md-up {
        margin-bottom: 60px;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, auto);
        grid-gap: 20px;
        grid-template-areas:
            'user-welcome user-welcome'
            'user-orders-history user-points'
            'user-order user-order';
    }

    @include media.lg-up {
        grid-template-columns: 282px auto 320px;
        grid-template-rows: repeat(2, auto);
        grid-gap: 30px;
        grid-template-areas:
            'user-welcome user-welcome user-points'
            'user-orders-history user-order user-order';
    }

    @include media.xl-up {
        grid-template-columns: 320px auto 320px;
        grid-template-areas:
            'user-welcome user-welcome user-points'
            'user-orders-history user-order user-order';
    }
}

.profile__user-welcome {
    grid-area: user-welcome;
    padding-top: 40px;
    padding-bottom: 15px;
    padding-left: 30px;
    position: relative;

    @include media.xl-up {
        overflow-y: hidden;
        padding-left: 80px;
    }

    &::before {
        content: '';
        position: absolute;
        top: 10px;
        left: -160px;
        height: 30px;
        width: 300px;
        background: url('/images/user/vector-line.webp') no-repeat;
        background-size: 100%;

        @include media.md-up {
            height: 45px;
        }

        @include media.lg-up {
            left: -190px;
            top: 0;
            width: 400px;
        }

        @include media.xl-up {
            width: 450px;
        }
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 230px;
        z-index: -1;
        width: 62px;
        aspect-ratio: 1;
        background: url('/images/user/sun-pale.webp') no-repeat;
        background-size: 100%;

        @include media.lg-up {
            width: 76px;
            left: unset;
            right: 30px;
        }

        @include media.xl-up {
            width: 122px;
            right: 60px;
        }
    }
}

.profile__user-welcome-hello {
    font-family: var(--f-base);
    font-size: functions.rem(24);
    line-height: functions.rem(28);
    font-style: italic;
    font-weight: 600;
    color: var(--c-secondary-extra-dark);
    margin-bottom: 10px;

    @include media.lg-up {
        font-size: functions.rem(40);
        line-height: functions.rem(47);
        margin-bottom: 6.5px;
    }
}

.profile__user-welcome-name {
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;

    span {
        font-family: var(--f-base);
        font-size: functions.rem(24);
        line-height: functions.rem(28);
        font-weight: 300;
        color: var(--c-secondary);

        @include media.lg-up {
            font-size: functions.rem(48);
            line-height: functions.rem(56);
        }
    }
}

.profile__user-welcome-icon {
    display: inline-block;
    height: 48px;
    aspect-ratio: 1;
    margin-left: 44px;

    @include media.lg-up {
        height: 72px;
        margin-left: 78px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.profile__user-points {
    grid-area: user-points;
    background-color: var(--c-secondary-extra-light);
    position: relative;

    @include media.xl-up {
        overflow-x: clip;
    }

    &::before {
        content: '';
        position: absolute;
        bottom: -10px;
        right: -15px;
        width: 127px;
        height: 87px;
        background-image: url('/images/user/pizza_slice.webp');
        background-size: 100%;

        @include media.md-up {
            width: 105px;
            height: 72px;
        }

        @include media.lg-up {
            width: 184px;
            height: 125px;
            right: -47px;
            bottom: -25px;
        }
    }

    span {
        display: block;
        font-family: var(--f-base);
        font-weight: 400;
        font-size: functions.rem(20);
        line-height: functions.rem(24);
        color: var(--c-secondary-extra-dark);
        margin-bottom: 5px;

        @include media.lg-up {
            font-size: functions.rem(32);
            line-height: functions.rem(38);
            margin-bottom: 15px;
        }
    }
}

.profile__user-points-converting {
    font-family: var(--f-base);
    font-weight: 400;
    font-size: functions.rem(14);
    line-height: functions.rem(16);
    color: var(--c-secondary-dark);
    margin-bottom: 10px;
}

.profile__user-points-balance {
    font-family: var(--f-base);
    font-size: functions.rem(28);
    line-height: functions.rem(34);
    font-weight: 800;
    color: var(--c-secondary);
    margin-bottom: 25px;

    @include media.md-up {
        margin-bottom: 15px;
    }

    @include media.lg-up {
        margin-bottom: 10px;
        font-size: functions.rem(38);
        line-height: functions.rem(45);
    }

    i {
        color: var(--c-primary);

        &::before {
            margin: 0;
        }
    }
}

.profile__user-orders-history {
    grid-area: user-orders-history;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 163px;

    @include media.md-up {
        min-height: unset;
    }

    span {
        font-family: var(--f-base);
        font-size: functions.rem(20);
        line-height: functions.rem(24);
        font-weight: 400;
        color: var(--c-grey70);
        margin-bottom: 15px;

        @include media.lg-up {
            font-size: functions.rem(24);
            line-height: functions.rem(28);
        }

        @include media.xl-up {
            font-size: functions.rem(32);
            line-height: functions.rem(38);
        }
    }

    button {
        margin-top: auto;
    }
}

.profile__user-order {
    grid-area: user-order;
    min-height: 190px;

    @include media.lg-up {
        min-height: 206px;
    }
}

.profile__mailing {
    margin-bottom: 40px;

    @include media.md-up {
        margin-bottom: 60px;
    }
}

.profile__mailing-radio-btn {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-bottom: 20px;

    @include media.lg-up {
        margin-bottom: 30px;
    }
}

.profile__mailing-description {
    color: var(--c-grey60);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;

    @include media.lg-up {
        margin-bottom: 30px;
    }
}

.profile__mailing-mail {
    @include media.md-up {
        max-width: 312px;
    }
}

.profile__saved-addresses {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @include media.md-up {
        margin-bottom: 60px;
        max-width: 360px;
    }
}

.profile__saved-address {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.profile__saved-address-icon {
    color: var(--c-primary);
    font-size: functions.rem(24);
}

.profile__saved-address-name {
    color: var(--c-secondary);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    font-weight: 600;
    line-height: normal;
}

.profile__saved-address-remove {
    color: var(--c-grey30);
    font-size: functions.rem(24);
    margin-left: auto;
}

.profile__personal-data {
    margin-bottom: 60px;

    @include media.md-up {
        margin-bottom: 30px;
    }

    @include media.lg-up {
        margin-bottom: 80px;
    }

    @include media.xl-up {
        margin-bottom: 120px;
    }
}

.profile__personal-data-bonus {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;

    @include media.md-up {
        margin-bottom: 30px;
    }
}

.profile__personal-data-bonus-img {
    width: 58px;
    height: 58px;

    img {
        height: 100%;
        object-fit: contain;
    }
}

.profile__personal-data-bonus-text {
    color: var(--c-grey70);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: normal;
    margin-bottom: 10px;

    span {
        background-color: var(--c-secondary-extra-light);
        padding: 3px 10px;
        border-radius: var(--b-radius-2xl);
        color: var(--c-secondary);
        font-family: var(--f-base);
        font-size: functions.rem(16);
        font-weight: 700;
        line-height: normal;

        i {
            color: var(--c-primary);

            &:before {
                margin-right: 0;
            }
        }
    }
}

.profile__personal-data-bonus-subtext {
    color: var(--c-grey50);
    font-family: var(--f-base);
    font-size: functions.rem(14);
    font-weight: 400;
    line-height: normal;
}

.profile__personal-data-image-block {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;

    @include media.md-up {
        margin-bottom: 30px;
    }
}

.profile__personal-data-image {
    width: 58px;
    height: 58px;

    img {
        height: 100%;
        object-fit: contain;
    }
}

.profile__personal-data-gender {
    display: flex;
    flex-direction: row;
    gap: 30px;
    margin-bottom: 20px;
    color: var(--c-grey70);
}

.profile__personal-data-btns {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 60px;

    @include media.md-up {
        flex-direction: row-reverse;
        max-width: 540px;
    }

    button {
        padding: 20px;
        font-size: functions.rem(18);
        width: 100%;

        @include media.md-up {
            font-size: functions.rem(16);
        }
    }
}

.profile__bonus {
    background-color: var(--c-secondary-extra-light);
    padding: 3px 10px;
    border-radius: var(--b-radius-2xl);
    width: max-content;
    color: var(--c-secondary);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    font-weight: 700;
    line-height: normal;

    &::after {
        content: '\e812';
        font-family: var(--f-fontello);
        color: var(--c-primary);
        font-size: functions.rem(18);
        margin-left: 5px;
    }
}

.profile__input {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-bottom: 15px;

    .form-control {
        width: 100%;

        @include media.md-up {
            max-width: 312px;
        }
    }
}

.profile__input-label {
    color: var(--c-grey70);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: normal;
    margin-bottom: 15px;
}
</style>
