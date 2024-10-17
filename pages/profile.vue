<script lang="ts" setup></script>
<template>
    <div class="profile container">
        <h1 class="h1">Профиль</h1>
        <div class="profile__user-grid">
            <div class="profile__user-welcome">1</div>
            <div class="profile__user-points">
                <div class="profile__user-points-converting">1 балл Рустерс = 1 ₽</div>
                <span>Сейчас у вас</span>
                <div class="profile__user-points-balance">
                    150
                    <BaseIcon name="pizza-slice" />
                </div>
                <a href="#">Как их использовать?</a>
            </div>
            <div class="profile__user-orders">3</div>
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

    @include media.md-up {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, auto);
    }
}

.profile__user-points {
    border-radius: var(--b-radius-lg);
    background-color: var(--c-secondary-extra-light);
    padding: 15px;

    @include media.md-up {
        padding: 20px;
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
</style>
