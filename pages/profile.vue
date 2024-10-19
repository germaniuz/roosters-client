<script lang="ts" setup></script>
<template>
    <div class="profile container container--sm">
        <h1 class="h1">Профиль</h1>
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
            <div class="profile__user-points">
                <div class="profile__user-points-converting">1 балл Рустерс = 1 ₽</div>
                <span>Сейчас у вас</span>
                <div class="profile__user-points-balance">
                    150
                    <BaseIcon name="pizza-slice" />
                </div>
                <a href="#">Как их использовать?</a>
            </div>
            <div class="profile__user-orders">
                <span>Все заказы и начисления баллов</span>
                <div>История заказов</div>
                <BaseButton :modifiers="['secondary']">Посмотреть все</BaseButton>
            </div>
            <div class="profile__user-active-orders">4</div>
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
    grid-template-areas:
        'user-welcome'
        'user-points'
        'user-orders'
        'user-active-orders';

    @include media.md-up {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, auto);
        grid-gap: 20px;
        grid-template-areas:
            'user-welcome user-welcome'
            'user-orders user-points'
            'user-active-orders user-active-orders';
    }

    @include media.lg-up {
        grid-template-columns: 282px auto 320px;
        grid-template-rows: repeat(2, auto);
        grid-gap: 30px;
        grid-template-areas:
            'user-welcome user-welcome user-points'
            'user-orders user-active-orders user-active-orders';
    }

    @include media.xl-up {
        grid-template-columns: 320px auto 320px;
        grid-template-areas:
            'user-welcome user-welcome user-points'
            'user-orders user-active-orders user-active-orders';
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
    border-radius: var(--b-radius-lg);
    background-color: var(--c-secondary-extra-light);
    padding: 15px;
    position: relative;

    @include media.md-up {
        padding: 20px;
    }

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

    a {
        font-family: var(--f-base);
        font-weight: 400;
        font-size: functions.rem(14);
        line-height: functions.rem(16);
        color: var(--c-secondary);
        text-decoration: underline;
        transition: all 0.2s ease-in-out;

        &:hover {
            color: var(--c-secondary-extra-dark);
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

.profile__user-orders {
    grid-area: user-orders;
    border-radius: var(--b-radius-lg);
    background-color: var(--c-grey10);
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 163px;
    padding: 15px;

    @include media.md-up {
        padding: 20px;
        min-height: unset;
    }

    span {
        font-family: var(--f-base);
        font-size: functions.rem(14);
        line-height: functions.rem(16);
        color: var(--c-grey50);
        font-weight: 400;
    }

    div {
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

.profile__user-active-orders {
    grid-area: user-active-orders;
}
</style>
