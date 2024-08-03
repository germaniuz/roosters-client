<script lang="ts" setup>
import { useAppStore } from '~/stores/app';

const { phone } = useAppStore();
</script>

<template>
    <header class="header">
        <div class="container header__container">
            <BaseLogo class="header__logo" />
            <a :href="`tel:${phone}`" class="header__phone">
                <img src="/images/icons/phone.svg" alt="Рустерс звонок" /> <span>{{ phone }}</span>
            </a>
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
        padding-block: 20px;
    }

    @include media.xl-up {
        padding-bottom: 25px;
    }
}

.header__logo {
    position: relative;
    top: -8px;
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

.header__phone {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
        flex: 0 0 25px;
        width: 25px;
        height: auto;

        @include media.sm-down {
            display: none;
        }
    }

    span {
        font-weight: 600;
        color: var(--c-grey70);
    }
}
</style>
