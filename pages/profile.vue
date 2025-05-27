<script lang="ts" setup>
import { type ProfileFields, ProfileFieldsSchema } from '~/types/Profile';
import type { Story } from '~/types/Story';
import { UPDATE_CLIENT_USER } from '~/gql/mutations/clientUser';
import { useMutation } from 'villus';
import { LOGOUT_PATH } from '~/constants/routing';
import { GENDER } from '~/constants/user';

const { t } = useI18n();

const savedAddresses = ref<Array<string>>(['Ул. Рабоче-Крестьянская 31', 'Улица Клавы Нечаевой, 4']); // TODO: JS add addresses
const stories = ref<Array<Story>>([
    // TODO: JS add stories
    {
        image: '/images/stories/story.webp',
        link: '#',
    },
    {
        image: '/images/stories/story2.webp',
        link: '#',
    },
    {
        image: '/images/stories/story3.webp',
        link: '#',
    },
    {
        image: '/images/stories/story3.webp',
        link: '#',
    },
]);

const { isGuest, profile } = storeToRefs(useProfileStore());

const { execute: updateClientUser } = useMutation(UPDATE_CLIENT_USER);

const profileFields = ref<ProfileFields>({
    name: profile.value?.name ?? '',
    lastname: profile.value?.lastname ?? '',
    phone: profile.value?.phone ?? '',
    email: profile.value?.email ?? '',
    avatar: null,
    birthday: profile.value?.birthday ?? '1900-01-01',
    gender:
        profile.value?.gender == GENDER.MALE || profile.value?.gender == GENDER.FEMALE
            ? profile.value?.gender
            : GENDER.MALE,
    is_active: profile.value?.is_active ?? false,
});

const { validate, formErrors } = useValidateFormData<ProfileFields>(profileFields, ProfileFieldsSchema);

const mailingEmail = ref<string>(profileFields.value.email);
const subscribeMailing = ref<boolean>(mailingEmail.value !== '');

const userIsMale = ref<boolean>(profileFields.value.gender === GENDER.MALE);
const userIsFemale = ref<boolean>(profileFields.value.gender === GENDER.FEMALE);

const handleMaleCheckboxClick = () => {
    userIsMale.value = true;
    userIsFemale.value = false;
    profileFields.value.gender = GENDER.MALE;
};

const handleFemaleCheckboxClick = () => {
    userIsFemale.value = true;
    userIsMale.value = false;
    profileFields.value.gender = GENDER.FEMALE;
};

const _handleFile = (file: File): void => {
    profileFields.value.avatar = file;
};

const saveProfile = async () => {
    const validationResult = validate();

    if (validationResult.success) {
        try {
            if (mailingEmail.value) {
                profileFields.value.email = mailingEmail.value;
            }
            await updateClientUser(profileFields.value);
        } catch (e) {
            console.error(e);
        }
    }
};
</script>
<template>
    <div v-if="profile" class="profile container container--sm">
        <div class="profile__user-grid">
            <div class="profile__user-welcome">
                <div class="profile__user-welcome-hello">Добрый {{ t(`day_parts.${getNameOfDayPart()}`) }},</div>
                <div class="profile__user-welcome-name">
                    <div class="profile__user-welcome-icon">
                        <img src="/images/icons/avatar-dark.svg" alt="Profile" />
                    </div>
                    <span>{{ profile?.name ? profile.name : 'Гость' }}</span>
                </div>
            </div>
            <div class="card card--p-md profile__user-points">
                <div class="profile__user-points-converting">1 балл Рустерс = 1 ₽</div>
                <span>Сейчас у вас</span>
                <div class="profile__user-points-balance">
                    {{ profile?.cashback ?? 0 }}
                    <BaseIcon name="pizza-slice-filled" />
                </div>
                <a class="link link--secondary" href="#">Как их использовать?</a>
            </div>
            <UserOrders />
        </div>
        <div v-if="!isGuest" class="profile__mailing">
            <div class="profile__mailing-radio-btn">
                <RadioButton v-model="subscribeMailing" name="profile-mailing" label="" />
                <span class="h2 h2--no-mb">Подписаться на рассылку</span>
            </div>
            <div class="profile__mailing-description">Получать персональные предложения, акции и новости.</div>
            <div v-if="subscribeMailing" class="profile__input">
                <FormInput
                    v-model="mailingEmail"
                    class="profile__mailing-mail"
                    name="mailing-email"
                    placeholder="Введите адрес"
                />
                <div v-if="!mailingEmail" class="profile__bonus">+50</div>
                <BaseButton
                    v-if="mailingEmail && mailingEmail !== profile?.email"
                    class="profile__mailing-save-btn"
                    :modifiers="['primary']"
                    @click="saveProfile"
                    >Сохранить
                </BaseButton>
            </div>
        </div>
        <div v-if="!isGuest" class="profile__promo">
            <div class="h2 h2--no-mb profile__promo-title">Персональные акции</div>
            <div class="profile__promo-carousel">
                <div v-for="story in stories" :key="story.link" class="profile__promo-image">
                    <a :href="story.link"></a>
                    <img :src="story.image" alt="story" />
                </div>
            </div>
            <BaseButton class="profile__all-promo-btn" :modifiers="['outline-secondary']">Посмотреть все</BaseButton>
        </div>
        <div v-if="profile.addresses?.length" class="h2">Ваши адреса</div>
        <div v-if="profile.addresses?.length" class="profile__saved-addresses">
            <div v-for="address in profile.addresses" :key="address.id" class="profile__saved-address">
                <BaseIcon class="profile__saved-address-icon" name="location" />
                <div class="profile__saved-address-name">{{ address.address }}</div>
                <BaseIcon class="profile__saved-address-remove" name="close" />
            </div>
        </div>
        <div v-if="!isGuest" class="h2">Персональные данные</div>
        <div v-if="profile" class="profile__personal-data">
            <div class="profile__personal-data-bonus">
                <div class="profile__personal-data-bonus-img">
                    <img src="/images/exclamation.webp" alt="" />
                </div>
                <div>
                    <div class="profile__personal-data-bonus-text">
                        Получите
                        <span>до 150 <BaseIcon name="pizza-slice-filled" /></span>
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
            <div class="profile__input-label">Имя</div>
            <div class="profile__input">
                <FormInput v-model="profileFields.name" name="name" placeholder="Имя" />
                <div v-if="!profileFields.name" class="profile__bonus">+50</div>
            </div>
            <div class="profile__input-label">Дата рождения (укажите дату рождения, чтобы получать скидки)</div>
            <div class="profile__input">
                <FormInput v-model="profileFields.birthday" name="birthday" type="date" placeholder="День рождения" />
                <div v-if="!profileFields.birthday" class="profile__bonus">+50</div>
            </div>
            <div class="profile__input-label">Email</div>
            <div class="profile__input">
                <FormInput v-model="profileFields.email" name="email" :errors="formErrors?.email" placeholder="Email" />
                <div v-if="!profileFields.email" class="profile__bonus">+50</div>
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
            <div class="profile__personal-data-btns">
                <BaseButton :modifiers="['primary']" @click="saveProfile">Сохранить</BaseButton>
                <BaseButtonLink :link-to="LOGOUT_PATH" :modifiers="['outline']">Выйти</BaseButtonLink>
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
    font-family: var(--f-base), sans-serif;
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
        font-family: var(--f-base), sans-serif;
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
        font-family: var(--f-base), sans-serif;
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
    font-family: var(--f-base), sans-serif;
    font-weight: 400;
    font-size: functions.rem(14);
    line-height: functions.rem(16);
    color: var(--c-secondary-dark);
    margin-bottom: 10px;
}

.profile__user-points-balance {
    font-family: var(--f-base), sans-serif;
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
    font-family: var(--f-base), sans-serif;
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

.profile__mailing-save-btn {
    padding: 20px 30px;
}

.profile__promo {
    display: grid;
    grid-row-gap: 30px;
    margin-bottom: 40px;
    grid-template-areas:
        'promo-title'
        'promo-carousel'
        'all-promo-btn';

    @include media.md-up {
        margin-bottom: 60px;
        grid-template-columns: max-content 1fr;
        align-items: center;
        column-gap: 20px;
        grid-template-areas:
            'promo-title all-promo-btn'
            'promo-carousel promo-carousel';
    }
}

.profile__promo-title {
    grid-area: promo-title;
}

.profile__promo-carousel {
    grid-area: promo-carousel;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    gap: 20px;
    margin-inline: calc(var(--pi-container-xs) * -1);
    padding-inline: var(--pi-container-xs);

    @include media.md-only {
        margin-inline: calc(var(--pi-container-xl) * -1);
        padding-inline: var(--pi-container-xl);
    }
}

.profile__promo-image {
    min-width: 130px;
    max-height: 174px;
    aspect-ratio: 0.75;
    border-radius: var(--b-radius);
    overflow: hidden;

    @include media.md-up {
        min-width: 185px;
        max-height: 244px;
    }

    @include media.lg-up {
        width: 208px;
        max-height: 276px;
    }

    img {
        width: 100%;
        object-fit: cover;
    }
}

.profile__all-promo-btn {
    grid-area: all-promo-btn;
    padding: 10px 30px;

    @include media.md-up {
        width: max-content;
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
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(16);
    font-weight: 600;
    line-height: normal;
}

.profile__saved-address-remove {
    color: var(--c-grey30);
    font-size: functions.rem(24);
    margin-left: auto;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
        color: var(--c-grey60);
    }
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
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: normal;
    margin-bottom: 10px;

    span {
        background-color: var(--c-secondary-extra-light);
        padding: 3px 10px;
        border-radius: var(--b-radius-2xl);
        color: var(--c-secondary);
        font-family: var(--f-base), sans-serif;
        font-size: functions.rem(16);
        font-weight: 700;
        line-height: 1.5;

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
    font-family: var(--f-base), sans-serif;
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
    max-width: 312px;

    @include media.md-up {
        margin-bottom: 30px;
    }

    button {
        width: 100%;
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

    button,
    a {
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
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(16);
    font-weight: 700;
    line-height: normal;

    &::after {
        content: '\e846';
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
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: normal;
    margin-bottom: 15px;
}
</style>
