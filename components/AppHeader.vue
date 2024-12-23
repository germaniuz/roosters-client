<script lang="ts" setup>
import { useAppStore } from '~/stores/app';
import BaseAppStoreButton from '~/components/BaseAppStoreButton.vue';
import BaseSocial from '~/components/BaseSocial.vue';
import { CLIENT_PROFILE } from '~/gql/queries/profile';

const { phone } = useAppStore();
const { isGuest, isAuthenticated } = storeToRefs(useProfileStore());
const menuIsActive = ref<boolean>(false);

const toggleMobileMenu = () => {
    menuIsActive.value = !menuIsActive.value;
    document.body.classList.toggle('body--fixed');
};
const isAuthDialogActive = ref(false);

const authPhone = ref('');
const isCodeVerificationDialogActive = ref(false);
const openCodeVerificationDialog = (phone: string) => {
    authPhone.value = phone;
    isAuthDialogActive.value = false;
    isCodeVerificationDialogActive.value = true;
};

const headerCategories = ref(['Сеты', 'Пицца', 'Шашлык', 'Закуски', 'Напитки', 'Акции']);
const { onLogin } = useApollo();

const logginUser = async (token: string) => {
    isCodeVerificationDialogActive.value = false;
    onLogin(token, 'default');
    nextTick(async () => {
        const { data: profile } = await useAsyncQuery(CLIENT_PROFILE);
        console.log(profile.value);
    });
};
</script>

<template>
    <header class="header" :class="{ 'header--mobile-menu-active': menuIsActive }">
        <div class="container header__container">
            <BaseLogo class="header__logo" :has-text="true" />
            <div class="header__delivery-banner">
                <i class="icon-f1"></i>
                <span
                    >Круглосуточная доставка<br />
                    от 20 минут</span
                >
            </div>
            <a :href="`tel:${phone}`" class="header__phone">
                <img src="/images/icons/phone.svg" alt="Рустерс звонок" /> <span>{{ phone }}</span>
            </a>
            <UserCard class="header__desktop-user-card" v-if="isAuthenticated" />
            <BaseButton
                v-if="isGuest"
                class="header__login"
                :modifiers="['grey', 'icon']"
                @click="isAuthDialogActive = true"
            >
                <img src="/images/icons/avatar.svg" alt="Вход Рустерс" /> <span>Войти</span>
            </BaseButton>
            <button class="menu-btn" :class="{ 'menu-btn--active': menuIsActive }" @click="toggleMobileMenu()"></button>
        </div>
        <div class="container header__categories">
            <div v-for="headerCategory in headerCategories" class="header__category">
                {{ headerCategory }}
            </div>
        </div>
    </header>
    <div class="mobile-menu header__mobile-menu" :class="{ 'mobile-menu--active': menuIsActive }">
        <BaseButton
            class="header__mobile-menu-login-btn"
            :modifiers="['third', 'icon']"
            @click="isAuthDialogActive = true"
            v-if="isGuest"
        >
            <i class="icon-avatar"></i> Войти
        </BaseButton>
        <div class="header__mobile-menu-divider" />
        <BaseContact
            image="/images/icons/phone.svg"
            text="8 (8442) 33-77-77"
            link="tel:8 (8442) 33-77-77"
            subtext="Бесплатный звонок"
        />
        <div class="header__mobile-menu-divider" />
        <div class="header__mobile-menu-categories">
            <div v-for="headerCategory in headerCategories" class="header__category">
                {{ headerCategory }}
            </div>
        </div>
        <div class="header__mobile-menu-divider" />
        <div class="header__mobile-menu-nav">
            <NuxtLink class="header__mobile-menu-nav-link" to="/delivery">Доставка</NuxtLink>
            <NuxtLink class="header__mobile-menu-nav-link" to="/about">О нас</NuxtLink>
            <NuxtLink class="header__mobile-menu-nav-link" to="/job-offers">Вакансии</NuxtLink>
            <NuxtLink class="header__mobile-menu-nav-link" to="/news">Новости</NuxtLink>
            <NuxtLink class="header__mobile-menu-nav-link" to="/reviews">Отзывы</NuxtLink>
        </div>
        <div class="header__mobile-menu-divider" />
        <div class="header__mobile-menu-apps">
            <BaseAppStoreButton icon="playmarket" download-text="Скачать из" store-name="Google Play" />
            <BaseAppStoreButton icon="appstore" download-text="Загрузите в" store-name="App Store" />
            <BaseAppStoreButton icon="huawei" download-text="Откройте в" store-name="AppGallery" />
        </div>
        <div class="header__mobile-menu-socials">
            <BaseSocial name="vk" link="#" />
        </div>
    </div>
    <BaseDialog v-model:is-active="isAuthDialogActive">
        <AuthCard @open-code-verification-dialog="openCodeVerificationDialog" />
    </BaseDialog>
    <BaseDialog v-model:is-active="isCodeVerificationDialogActive">
        <CodeCard :phone="authPhone" @logging-in="logginUser" />
    </BaseDialog>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.header {
    position: relative;
    z-index: var(--z-top-30);
    background-color: var(--c-grey00);
    transition: all 0.2s ease-in-out;

    @include media.sm-down {
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.05);
        position: sticky;
        left: 0;
        top: 0;
    }
}

.header__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding-block: 15px;

    @include media.md-to-lg {
        gap: 30px;
    }

    @include media.lg-up {
        padding-block: 20px;
    }

    @include media.xl-up {
        gap: 40px;
    }
}

.header__logo {
    position: relative;
    margin-top: -8px;
    flex: 0 0 116px;

    @include media.md-only {
        flex: 0 0 160px;
    }

    @include media.lg-up {
        flex: 0 0 185px;
    }
}

.header__delivery-banner {
    background-color: var(--c-grey05);
    padding: 10px 15px;
    border-radius: var(--b-radius-md);
    display: flex;
    align-items: center;
    gap: 50px;
    color: var(--c-secondary);
    line-height: normal;
    max-width: 200px;
    transition: opacity 0.2s ease-in-out;

    @include media.sm-down {
        display: none;
    }

    @include media.md-down {
        .header--mobile-menu-active & {
            opacity: 0;
        }
    }

    i {
        font-size: functions.rem(16);

        @include media.lg-up {
            font-size: functions.rem(18);
        }

        @include media.sm-down {
            display: none;
        }
    }

    span {
        font-size: functions.rem(11);
    }
}

.header__phone {
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
    transition: opacity 0.2s ease-in-out;

    @include media.sm-down {
        margin-left: auto;
    }

    @include media.md-down {
        .header--mobile-menu-active & {
            opacity: 0;
        }
    }

    &:hover {
        span {
            color: var(--c-primary);
        }
    }

    img {
        flex: 0 0 30px;
        width: 30px;
        height: auto;
        position: relative;

        @include media.sm-down {
            display: none;
        }
    }

    span {
        font-weight: 600;
        color: var(--c-grey70);
        transition: all 0.2s ease-in-out;
    }
}

.header__login {
    margin-left: auto;
    padding: 5px 35px 5px 5px;

    @include media.md-down {
        display: none;
    }
}

.header__categories {
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow-x: auto;
    padding-block: 5px;
    transform: scaleY(1);
    transform-origin: top;
    transition: transform 0.2s ease-in-out;
    margin-bottom: 40px;

    @include media.md-down {
        .header--mobile-menu-active & {
            transform: scaleY(0);
            position: absolute;
        }
    }

    @include media.lg-up {
        padding-block: 10px;
    }

    &::-webkit-scrollbar {
        display: none;
    }
}

.header__category {
    padding: 8px 20px;
    background-color: var(--c-grey10);
    border-radius: var(--b-radius-round);
    color: var(--c-grey80);
    cursor: pointer;
    position: relative;

    &:hover {
        &::after {
            background-color: var(--c-primary);
        }
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        translate: -50%;
        width: 50%;
        height: 2px;
        background-color: transparent;
        border-radius: var(--b-radius-round);
        transition: all 0.2s ease-in-out;
    }

    @include media.lg-up {
        &::after {
            height: 4px;
        }
    }
}

.header__mobile-menu-login-btn {
    width: 100%;
    padding-block: 15px;

    i {
        font-size: functions.rem(24);
    }
}

.header__mobile-menu-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 13px;
}

.header__mobile-menu-nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.header__mobile-menu-nav-link {
    color: var(--c-grey50);
    max-width: max-content;

    &:hover {
        color: var(--c-secondary);
    }

    &:not(:first-child) {
        padding-top: 10px;
    }

    &:not(:last-child) {
        padding-bottom: 10px;
    }
}

.header__mobile-menu-apps {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 30px;
}

.header__mobile-menu-socials {
    display: flex;
    flex-direction: row;
    gap: 28px;
    margin-bottom: 30px;
}

.header__mobile-menu-remark {
    color: var(--c-grey50);
    font-family: var(--f-base);
    font-size: functions.rem(12);
    font-weight: 400;
    line-height: normal;
}

.header__mobile-menu-divider {
    border-bottom: 1px solid var(--c-grey20);
    margin-block: 30px;
}

.header__desktop-user-card {
    @include media.md-down {
        display: none;
    }
}
</style>
