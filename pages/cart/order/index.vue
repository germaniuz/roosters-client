<script lang="ts" setup>
import { useMutation } from 'villus';
import { CREATE_ORDER, CREATE_PAYMENT_URL } from '~/gql/mutations/order';
import { PAYMENT_TYPE } from '~/constants/order';

const router = useRouter();
const { profile, isGuest } = storeToRefs(useProfileStore());
const { activeShop, activeDeliveryType } = storeToRefs(useDeliveryStore());
const { dropLocalCart } = useCartStore();

const paymentOptions = [
    {
        id: PAYMENT_TYPE.ONLINE,
        title: 'Онлайн',
    },
    {
        id: PAYMENT_TYPE.RECEIPT_CARD,
        title: 'Картой при получении',
    },
    {
        id: PAYMENT_TYPE.RECEIPT_CASH,
        title: 'Наличными при получении',
    },
];
const activePaymentOption = ref(paymentOptions[0]);
const userComment = ref('');

const { execute: createOrder } = useMutation(CREATE_ORDER);
const { execute: createPaymentUrl } = useMutation(CREATE_PAYMENT_URL);

const handleOrder = async () => {
    if (activeShop.value) {
        const res = await createOrder({
            shop_id: activeShop.value.id,
            customer_comment: userComment.value,
            payment_type: activePaymentOption.value.id,
            delivery_type: activeDeliveryType.value.key,
            user_address: null,
        });

        if (!res.data?.createClientOrder) {
            throw new Error('Ошибка создания заказа');
        }

        dropLocalCart();

        if (activePaymentOption.value.id === PAYMENT_TYPE.ONLINE) {
            const paymentUrlRes = await createPaymentUrl({
                order_id: res.data.createClientOrder.id,
            });

            if (!paymentUrlRes.data?.createClientOrderPaymentUrl) {
                throw new Error('Ошибка создания ссылки на оплату');
            }

            window.location.href = paymentUrlRes.data.createClientOrderPaymentUrl.url;
        }
    }
};

onMounted(async () => {
    if (isGuest.value) {
        router.push('/');

        return;
    }
});
</script>

<template>
    <div v-if="profile" class="container container--sm placing-order">
        <h1 class="h1">
            <span class="h1--md-hidden">Корзина -</span> Оформление
            <span class="h1--grey h1--md-hidden"> - Заказ принят</span>
        </h1>
        <div class="placing-order__grid">
            <div class="placing-order__info">
                <div class="placing-order__contacts">
                    <div class="placing-order__contacts-header">
                        <h2 class="h2">Контакты</h2>
                    </div>
                    <div v-if="profile?.name">{{ profile.name }}</div>
                    <div>Телефон: {{ profile.phone }}</div>
                </div>
                <div class="placing-order__we-are-here">
                    <div class="placing-order__we-are-here-title">
                        <RadioButton name="we-are-here" label="" />
                        <h2 class="h2">Мы рядом!</h2>
                        <span>i</span>
                    </div>
                    <span>Наши операторы свяжутся с вами чтобы уточнить, что привезти из ближайшего магазина</span>
                </div>
                <div class="placing-order__payment">
                    <h2 class="h2">Оплата</h2>
                    <BaseTabsChooser v-model="activePaymentOption" :tabs="paymentOptions" item-key="id">
                        <template #btn="{ item }">{{ item.title }}</template>
                    </BaseTabsChooser>
                </div>
                <div class="placing-order__bottom">
                    <div class="placing-order__action-btns">
                        <NuxtLink class="btn btn--outline" to="./">Назад в корзину</NuxtLink>
                        <NuxtLink class="btn btn--primary" @click="handleOrder">Заказать</NuxtLink>
                    </div>
                    <div class="placing-order__user-agreement">
                        Нажимая на кнопку “Заказать”, вы соглашаетесь со сбором и обработкой персональных данных,
                        пользовательским соглашением, а также на получением рекламных сообщений
                    </div>
                </div>
            </div>
            <CartSummary class="placing-order__summary" type="view" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.placing-order {
    h1 {
        padding-bottom: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid var(--c-grey30);
    }
}

.placing-order__grid {
    width: 100%;
    margin-bottom: 60px;

    @include media.md-up {
        margin-bottom: 30px;
    }

    @include media.lg-up {
        display: grid;
        grid-template-columns: 1fr 350px;
        column-gap: 20px;
        margin-bottom: 80px;
        grid-template-areas:
            'info summary'
            'info .'
            'info .';
    }

    @include media.xl-up {
        margin-bottom: 120px;
    }
}

.placing-order__info {
    grid-area: info;
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-bottom: 40px;

    @include media.md-only {
        margin-bottom: 20px;
    }

    @include media.lg-up {
        gap: 60px;
        margin-bottom: 0;
    }
}

.placing-order__summary {
    grid-area: summary;
}

.placing-order__contacts {
    @include media.md-up {
        gap: 15px;
    }

    .form-control {
        max-width: 312px;

        &:not(:last-child) {
            margin-bottom: 20px;

            @include media.md-up {
                margin-bottom: 15px;
            }
        }
    }
}

.placing-order__contacts-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;

    h2 {
        margin-bottom: 0;
    }
}

.placing-order__delivery {
    max-width: 460px;
}

.placing-order__delivery-map-btn {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding-block: 18px;
    background-color: var(--c-grey10);
    border-radius: var(--b-radius-md);
    color: var(--c-grey60);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: functions.rem(19);
    margin-bottom: 30px;
    cursor: pointer;
    transition: all 0.1s ease-in;

    @include media.lg-up {
        padding-block: 21px;
    }

    &:hover {
        color: var(--c-primary);
        background-color: var(--c-grey20);
    }

    i {
        color: var(--c-primary);
        font-size: functions.rem(21);

        &::before {
            margin: 0;
        }
    }
}

.placing-order__addresses {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.placing-order__address {
    position: relative;
    padding: 15px 20px;
    border: 1px solid transparent;
    border-radius: var(--b-radius-md);
    cursor: pointer;
    transition: all 0.1s ease-in;

    &:hover {
        @include media.lg-up {
            border: 1px solid var(--c-secondary);
        }
    }

    &--active {
        border: 1px solid var(--c-secondary);
    }
}

.placing-order__address-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

    @include media.lg-up {
        margin-bottom: 15px;
    }

    i {
        color: var(--c-primary);
        font-size: functions.rem(21);

        &::before {
            margin: 0;
        }
    }

    span {
        color: var(--c-secondary);
        font-family: var(--f-base), sans-serif;
        font-size: functions.rem(16);
        font-weight: 600;
        line-height: functions.rem(19);
    }
}

.placing-order__address-waiting-time {
    color: var(--c-grey60);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(14);
    font-weight: 400;
    line-height: 1;
}

.placing-order__address-text {
    color: var(--c-grey40);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(14);
    font-weight: 400;
    line-height: 1;

    &:not(:last-child) {
        margin-bottom: 5px;

        @include media.lg-up {
            margin-bottom: 10px;
        }
    }
}

.placing-order__address-checked {
    position: absolute;
    right: 20px;
    top: 50%;
    translate: 0 -50%;
    width: 24px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--c-primary);
    border-radius: var(--b-radius-round);
    color: var(--c-grey00);
    opacity: 0;
    transition: all 0.1s ease-in;

    .placing-order__address--active & {
        opacity: 1;
    }
}

.placing-order__delivery-options {
    display: flex;
    flex-direction: column;
    gap: 10px;

    @include media.md-up {
        flex-direction: row;
    }

    @include media.lg-up {
        max-width: 460px;
    }
}

.placing-order__delivery-option {
    padding: 13px 20px;
    border-radius: var(--b-radius-md);
    border: 1px solid var(--c-grey20);
    flex: 1;
    color: var(--c-grey50);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(14);
    line-height: functions.rem(17);
    font-weight: 400;
    cursor: pointer;
    transition: all 0.1s ease-in;

    @include media.lg-up {
        padding-block: 18px;
    }

    &--active {
        border-color: var(--c-secondary);
        color: var(--c-grey80);
    }
}

.placing-order__date-time-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.placing-order__date-time-option {
    padding: 15px;
    color: var(--c-grey80);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(14);
    font-weight: 400;
    line-height: functions.rem(17);
    border-radius: var(--b-radius-sm);
    cursor: pointer;
    transition: all 0.1s ease-in;

    &:hover {
        color: var(--c-secondary);
    }

    &--active {
        background-color: var(--c-secondary-extra-light);
        color: var(--c-secondary);
    }
}

.placing-order__date-time-option-group {
    overflow: auto;
    height: 200px;
    margin-bottom: 20px;
}

.placing-order__we-are-here {
    max-width: 540px;

    span {
        color: var(--c-grey60);
        font-family: var(--f-base), sans-serif;
        font-size: functions.rem(14);
        line-height: functions.rem(17);
        font-weight: 400;
    }
}

.placing-order__we-are-here-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
    gap: 20px;

    h2 {
        margin-bottom: 0;
    }

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        aspect-ratio: 1;
        border-radius: 50px;
        background-color: var(--c-secondary-extra-light);
        font-size: functions.rem(22);
        color: var(--c-secondary);
        font-weight: bold;
        cursor: pointer;
        transition: all 0.1s ease-in;

        &:hover {
            background-color: var(--c-secondary-light);
        }
    }
}

.placing-order__payment {
    margin-bottom: -20px;

    @include media.lg-up {
        max-width: 460px;
    }
}

.placing-order__action-btns {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;

    @include media.md-up {
        flex-direction: row;
    }

    @include media.lg-up {
        max-width: 540px;
    }

    @include media.xl-up {
        max-width: 690px;
    }

    .btn {
        flex: 1;
        padding-block: 17px;

        @include media.lg-up {
            padding-block: 19px;
        }
    }
}

.placing-order__user-agreement {
    color: var(--c-grey60);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(12);
    line-height: functions.rem(14);
    font-weight: 400;
}

.placing-order__dialog {
    width: 412px;

    button {
        width: 100%;
    }
}
</style>
