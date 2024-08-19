<script lang="ts" setup>
import { useAppStore } from '~/stores/app';

const { phone } = useAppStore();
const { isGuest } = storeToRefs(useProfileStore());
const menuIsActive = ref<boolean>(false);
</script>

<template>
    <header class="header" :class="{'header--mobile-menu-active' : menuIsActive}">
        <div class="container header__container">
            <BaseLogo class="header__logo" />
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
            <BaseButton v-if="isGuest" class="header__login" :modifiers="['grey', 'icon']"
                ><img src="/images/icons/avatar.svg" alt="Вход Рустерс" /> <span>Войти</span>
            </BaseButton>
            <button class="menu-btn" :class="{'menu-btn--active' : menuIsActive}" @click="menuIsActive = !menuIsActive"></button>
        </div>
    </header>
    <div class="mobile-menu" :class="{'mobile-menu--active' : menuIsActive}">
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.header {
    padding-block: 15px;
    position: relative;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.05);
    z-index: var(--z-top-30);

    @include media.lg-up {
        padding-block: 20px;
    }
}

.header__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    @include media.md-to-lg {
        gap: 30px;
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
    transition: opacity .2s ease-in-out;

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
    transition: opacity .2s ease-in-out;

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
        flex: 0 0 25px;
        width: 25px;
        height: auto;
        position: relative;
        top: -3px;

        @include media.sm-down {
            display: none;
        }

        @include media.md-up {
            width: 40px;
            height: auto;
            flex: 0 0 40px;
        }
    }

    span {
        font-weight: 600;
        color: var(--c-grey70);
        transition: all .2s ease-in-out;
    }
}

.header__login {
    margin-left: auto;
    padding: 5px 35px 5px 5px;

    @include media.md-down {
        display: none;
    }
}
</style>
