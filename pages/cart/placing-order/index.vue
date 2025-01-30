<script lang="ts" setup>
import CartSummary from '~/components/CartSummary.vue';

const items = ref([
    {
        title: 'СЕТ "ХИТ" 5 ПИЦЦ',
        img: '/images/test-pizza.webp',
        details: [
            {
                title: 'Маргарита',
                text: ['Средняя 28 см, традиционное тесто'],
            },
            {
                title: 'Жюльен',
                text: ['Средняя 28 см, традиционное тесто'],
            },
            {
                title: 'Фирменная Рустерс',
                text: ['Фирменная Рустерс'],
            },
            {
                title: 'Добавки',
                text: ['Наггетсы куриные', 'Картофель по-деревенски', 'Напиток Черноголовка, стекло 1 л'],
            },
        ],
        quantity: '1',
        price: '1200',
        price_old: '1500',
    },
    {
        title: 'ФИРМЕННАЯ РУСТЕРС',
        img: '/images/test-pizza.webp',
        details: [
            {
                title: 'Добавки',
                text: ['Наггетсы куриные', 'Картофель по-деревенски', 'Напиток Черноголовка, стекло 1 л'],
            },
        ],
        quantity: '1',
        price: '1200',
        price_old: '1500',
    },
]);

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
                    <FormInput placeholder="Имя" />
                    <FormInput placeholder="Телефон" />
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
                <h2 class="h2">Время доставки</h2>
                <h2 class="h2">Оплата</h2>
            </div>
            <CartSummary class="placing-order__summary" />
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

    @include media.lg-up {
        display: grid;
        grid-template-columns: 1fr 350px;
        column-gap: 20px;
        grid-template-areas:
            'info summary'
            'info .'
            'info .';
    }
}

.placing-order__info {
    grid-area: info;
    display: flex;
    flex-direction: column;
    gap: 40px;

    @include media.lg-up {
        gap: 60px;
    }
}

.placing-order__summary {
    grid-area: summary;
}

.placing-order__contacts {
    @include media.md-up {
        gap: 15px;
    }

    .form-control:not(:last-child) {
        margin-bottom: 20px;

        @include media.md-up {
            margin-bottom: 15px;
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
</style>
