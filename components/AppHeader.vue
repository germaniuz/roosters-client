<script lang="ts" setup>
import { useAppStore } from '~/stores/app';

const { phone } = useAppStore();
const { isGuest } = storeToRefs(useProfileStore());
</script>

<template>
    <header class="header">
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
            <div class="header__bars"><i class="icon-menu-bars"></i></div>
        </div>
    </header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.header {
    padding-block: 20px;

    @include media.md-only {
        padding-block: 15px;
    }

    @include media.lg-only {
        padding-block: 15px 20px;
    }

    @include media.xl-up {
        padding-block: 15px 25px;
    }
}

.header__container {
    display: flex;
    align-items: center;
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
    top: -8px;
    flex: 0 0 116px;

    @include media.md-only {
        flex: 0 0 160px;
    }

    @include media.lg-up {
        flex: 0 0 185px;
    }
}

.header__delivery-banner {
    display: flex;
    align-items: center;
    gap: 50px;
    color: var(--c-secondary);
    line-height: 1;

    @include media.sm-down {
        display: none;
    }

    i {
        font-size: functions.rem(20);

        @include media.md-down {
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
    }
}

.header__login {
    margin-left: auto;

    @include media.sm-down {
        display: none;
    }
}

.header__bars {
    color: var(--c-primary);
    font-size: functions.rem(20);
    line-height: 1;
    cursor: pointer;

    @include media.sm-down {
        margin-left: auto;
    }

    @include media.lg-up {
        display: none;
    }
}
</style>
