<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const dialogIsActive = ref(false);

onMounted(() => {
    if (route.query.from === 'order') {
        dialogIsActive.value = true;
        router.replace({ path: route.path });
    }
});
</script>
<template>
    <h1 class="h1">Заказы</h1>
    <BaseDialog v-model:is-active="dialogIsActive" class="thanks-for-order">
        <div class="thanks-for-order___img"><img src="/images/f1.png" alt="Thanks for order!" /></div>
        <div class="thanks-for-order___title">Спасибо за заказ!</div>
        <div class="thanks-for-order___number">Номер вашего заказа: №12345.</div>
        <div class="thanks-for-order___description">
            Мы уведомим вас, когда он будет готов к доставке. Статус вашего заказа вы можете отслеживать
            <NuxtLink to="/profile">в личном кабинете</NuxtLink>
            или
            <NuxtLink to="/public">на главной странице</NuxtLink>.
        </div>
        <div class="thanks-for-order___info">
            <div>
                <span class="thanks-for-order___info-number">Заказ №12345</span>
                <span class="thanks-for-order___info-time">~20 мин</span>
            </div>
            <div class="thanks-for-order___info-processing">Обрабатывается</div>
            <BaseIcon name="menu-bars" />
        </div>
        <NuxtLink class="btn btn--primary thanks-for-order___btn" to="/public">На главную</NuxtLink>
    </BaseDialog>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.thanks-for-order {
    > * {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

.thanks-for-order___img {
    height: 54px;
    margin-bottom: 40px;

    @include media.lg-up {
        height: 88px;
        margin-bottom: 60px;
    }

    img {
        height: 100%;
        object-fit: contain;
    }
}

.thanks-for-order___title {
    color: var(--c-secondary);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(20);
    line-height: functions.rem(24);
    font-weight: 600;
    margin-bottom: 10px;

    @include media.lg-up {
        font-size: functions.rem(32);
        line-height: functions.rem(38);
    }
}

.thanks-for-order___number {
    color: var(--c-grey80);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: functions.rem(19);
    margin-bottom: 30px;
}

.thanks-for-order___description {
    color: var(--c-grey60);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: functions.rem(19);
    margin-bottom: 20px;

    a {
        color: var(--c-secondary);
        transition: all 0.1s ease-in;

        &:hover {
            color: var(--c-primary);
        }
    }
}

.thanks-for-order___info {
    position: relative;
    width: 100%;
    padding: 10px 15px;
    border-radius: var(--b-radius-md);
    background-color: var(--c-grey10);
    margin-bottom: 40px;

    @include media.lg-up {
        margin-bottom: 60px;
    }

    i {
        position: absolute;
        right: 10px;
        top: 15px;
        font-size: functions.rem(10);
        color: var(--c-grey40);
    }
}

.thanks-for-order___info-number {
    color: var(--c-grey80);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(12);
    line-height: functions.rem(14);
    font-weight: 400;
    margin-right: 5px;
}

.thanks-for-order___info-time {
    color: var(--c-grey60);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(12);
    line-height: functions.rem(14);
    font-weight: 400;
}

.thanks-for-order___info-processing {
    color: var(--c-secondary);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(14);
    line-height: functions.rem(17);
    font-weight: 600;
    margin-top: 10px;
}

.thanks-for-order___btn {
    width: 100%;
}
</style>
