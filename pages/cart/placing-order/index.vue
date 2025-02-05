<script lang="ts" setup>
import CartSummary from '~/components/CartSummary.vue';
import RadioButton from '~/components/form/RadioButton.vue';
import type { DeliveryTimeOption } from '~/types/Cart';

const router = useRouter();

const deliveryOptions = ref([
    {
        id: 1,
        title: 'Самовывоз',
    },
    {
        id: 2,
        title: 'Доставка',
    },
]);
const activeDeliveryOption = ref(deliveryOptions.value[0]);

const deliveryTimeOptions = ref<DeliveryTimeOption[]>([
    {
        id: 1,
        title: 'Как можно скорее',
    },
    {
        id: 2,
        title: 'Другое время',
    },
]);
const activeDeliveryTimeOption = ref(deliveryTimeOptions.value[0]);

const paymentOptions = ref([
    {
        id: 1,
        title: 'Онлайн',
    },
    {
        id: 2,
        title: 'При получении',
    },
]);
const activePaymentOption = ref(paymentOptions.value[0]);

const addresses = ref([
    {
        id: 1,
        title: 'На Невской',
    },
    {
        id: 2,
        title: 'На Елецкой',
    },
    {
        id: 3,
        title: 'На Невской',
    },
    {
        id: 4,
        title: 'На Елецкой',
    },
]);
const activeAddress = ref(addresses.value[0]);

const dateOptions = ref([
    {
        id: 1,
        title: 'Сегодня, 28.01',
    },
    {
        id: 2,
        title: '29.01',
    },
    {
        id: 3,
        title: '30.01',
    },
    {
        id: 4,
        title: '31.01',
    },
    {
        id: 5,
        title: '01.02',
    },
    {
        id: 6,
        title: '02.02',
    },
]);
const activeDateOption = ref(dateOptions.value[0]);

const timeOptions = ref([
    {
        id: 1,
        title: '~16:30',
    },
    {
        id: 2,
        title: '~17:00',
    },
    {
        id: 3,
        title: '~18:00',
    },
    {
        id: 4,
        title: '~19:00',
    },
    {
        id: 5,
        title: '~20:00',
    },
    {
        id: 6,
        title: '~21:00',
    },
]);
const activeTimeOption = ref(timeOptions.value[0]);

const dateTimeDialogActive = ref<boolean>(false);

const name = ref<string>('');
const phone = ref<string>('');

const handleDateTimeClick = (option: DeliveryTimeOption) => {
    activeDeliveryTimeOption.value = option;

    if (option.id === 1) {
        activeDateOption.value = dateOptions.value[0];
        activeTimeOption.value = timeOptions.value[0];
    }

    if (option.id === 2) {
        dateTimeDialogActive.value = true;
    }
};

const handleOrder = () => {
    router.push({ path: '/orders', query: { from: 'placing-order' } });
};
</script>

<template>
    <div class="container container--sm placing-order">
        <h1 class="h1">
            <span class="h1--md-hidden">Корзина -</span> Оформление
            <span class="h1--grey h1--md-hidden"> - Заказ принят</span>
        </h1>
        <div class="placing-order__grid">
            <div class="placing-order__info">
                <div class="placing-order__contacts">
                    <div class="placing-order__contacts-header">
                        <h2 class="h2">Контакты</h2>
                        <button class="btn btn--outline">Action</button>
                    </div>
                    <FormInput v-model="name" placeholder="Имя" name="name" />
                    <FormInput v-model="phone" placeholder="Телефон" name="phone" />
                </div>
                <div class="placing-order__delivery">
                    <h2 class="h2">Доставка</h2>
                    <BaseTabsChooser v-model="activeDeliveryOption" :tabs="deliveryOptions" item-key="id">
                        <template #btn="{ item }">{{ item.title }}</template>
                    </BaseTabsChooser>
                    <div class="placing-order__delivery-map-btn">
                        <BaseIcon name="ya-maps" />
                        На карте
                    </div>
                    <div class="placing-order__addresses">
                        <div
                            class="placing-order__address"
                            :class="address.id === activeAddress.id ? 'placing-order__address--active' : ''"
                            v-for="address in addresses"
                            @click="activeAddress = address"
                        >
                            <div class="placing-order__address-name">
                                <BaseIcon name="ya-maps" />
                                <span>{{ address.title }}</span>
                                <div class="placing-order__address-waiting-time">~ 60 мин</div>
                            </div>
                            <div class="placing-order__address-text">Невская, 2, Центральный район</div>
                            <div class="placing-order__address-text">10:00 - 23:00</div>
                            <BaseIcon class="placing-order__address-checked" name="check" />
                        </div>
                    </div>
                </div>
                <div class="placing-order__delivery">
                    <h2 class="h2">Время доставки</h2>
                    <div class="placing-order__delivery-options">
                        <div
                            class="placing-order__delivery-option"
                            v-for="deliveryTime in deliveryTimeOptions"
                            :class="
                                deliveryTime.id === activeDeliveryTimeOption.id
                                    ? 'placing-order__delivery-option--active'
                                    : ''
                            "
                            @click="handleDateTimeClick(deliveryTime)"
                        >
                            {{ deliveryTime.title }}
                        </div>
                    </div>
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
        <BaseDialog v-model:is-active="dateTimeDialogActive" class="placing-order__dialog" :sm="true">
            <div class="placing-order__date-time-options">
                <div class="placing-order__date-time-option-group">
                    <div
                        class="placing-order__date-time-option"
                        :class="date.id === activeDateOption.id ? 'placing-order__date-time-option--active' : ''"
                        v-for="date in dateOptions"
                        @click="activeDateOption = date"
                    >
                        {{ date.title }}
                    </div>
                </div>
                <div class="placing-order__date-time-option-group">
                    <div
                        class="placing-order__date-time-option"
                        v-for="time in timeOptions"
                        :class="time.id === activeTimeOption.id ? 'placing-order__date-time-option--active' : ''"
                        @click="activeTimeOption = time"
                    >
                        {{ time.title }}
                    </div>
                </div>
            </div>
            <BaseButton :modifiers="['primary']" @click="dateTimeDialogActive = false">Action</BaseButton>
        </BaseDialog>
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
    font-family: var(--f-base);
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
        font-family: var(--f-base);
        font-size: functions.rem(16);
        font-weight: 600;
        line-height: functions.rem(19);
    }
}

.placing-order__address-waiting-time {
    color: var(--c-grey60);
    font-family: var(--f-base);
    font-size: functions.rem(14);
    font-weight: 400;
    line-height: 1;
}

.placing-order__address-text {
    color: var(--c-grey40);
    font-family: var(--f-base);
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
    font-family: var(--f-base);
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
    font-family: var(--f-base);
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
        font-family: var(--f-base);
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
    font-family: var(--f-base);
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
