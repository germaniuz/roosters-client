<script setup lang="ts">
import type { Product, ProductCategoryOption } from '~/types/Product';
import { CREATE_CLIENT_CART } from '~/gql/mutations/clientCart';

type Props = {
    product: Product;
};
const props = defineProps<Props>();
const ingredients = computed(() => props.product.product_ingredients.map((i) => i.ingredient.name).join(', '));

const activeProductCategoryOption = ref<ProductCategoryOption>(props.product.product_category_options[0]);

const { mutate } = useMutation(CREATE_CLIENT_CART);
const addToCart = async () => {
    await mutate({
        product_category_option: {
            product_category_option_id: activeProductCategoryOption.value.id,
            quantity: 1,
        },
    });
};

const adds = computed(() =>
    props.product.category.category_options_ingredient.filter(
        (item) => item.category_options.id === activeProductCategoryOption.value.category_option.id,
    ),
);

const sauces = ref([
    {
        id: 1,
        title: 'Белый',
    },
    {
        id: 2,
        title: 'Красный',
    },
    {
        id: 3,
        title: '50/50',
    },
    {
        id: 4,
        title: 'Альфредо',
    },
]);
const activeSauce = ref(sauces.value[0]);
</script>

<template>
    <div class="product">
        <div class="product__image">
            <div v-if="product.badges" class="badge">{{ product.badges[0].name }}</div>
            <img :src="product.file.url" :alt="product.name" />
            <div class="product__info"><i class="icon-info"></i></div>
        </div>
        <div class="product__data">
            <div class="product__title">{{ product.name }}</div>
            <div class="product__description">
                {{ ingredients }}
            </div>
            <div>
                <BaseTabsChooser
                    v-model="activeProductCategoryOption"
                    :tabs="product.product_category_options"
                    item-key="id"
                >
                    <template #btn="{ item }">
                        <div class="option">
                            <span class="option__title">{{ item.category_option.option.name }}</span>
                            <div class="option__price">{{ item.price }}&nbsp;₽</div>
                        </div>
                    </template>
                </BaseTabsChooser>
                <div class="product__subtitle">Соус</div>
                <BaseTabsChooser v-model="activeSauce" :tabs="sauces" item-key="id">
                    <template #btn="{ item }">{{ item.title }}</template>
                </BaseTabsChooser>
                <div class="product__subtitle">Хочу добавить в пиццу</div>
                <div class="grid grid--adds">
                    <div v-for="item in adds" :key="item.id" class="adds-card">
                        <div class="adds-card__image">
                            <img :src="item.ingredient.file.url" :alt="item.ingredient.name" />
                        </div>
                        <div class="adds-card__title">{{ item.ingredient.name }}</div>
                        <BaseButton :modifiers="['light']" class="adds-card__price">{{ item.price }} ₽</BaseButton>
                    </div>
                </div>
                <BaseButton :modifiers="['primary']" class="w-100" @click="addToCart"
                    >В корзину за {{ activeProductCategoryOption.price }} ₽
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/helpers/media';
@use '../assets/styles/helpers/functions';

.product {
    display: grid;
    gap: 30px;
    align-items: center;

    @include media.md-up {
        grid-template-columns: 245px 1fr;
    }

    @include media.xl-up {
        grid-template-columns: 380px 1fr;
    }
}

.product__subtitle {
    font-size: functions.rem(18);
    color: var(--c-grey80);
    margin-bottom: 15px;
}

.product__image {
    display: flex;
    flex-direction: column;
    gap: 16px;

    img {
        width: 245px;
        object-fit: contain;

        @include media.xl-up {
            width: 380px;
        }
    }
}

.product__title {
    font-size: functions.rem(24);
    font-weight: 700;
    font-family: var(--f-headings), serif;
    color: var(--c-grey80);
    margin-bottom: 8px;

    @include media.xl-up {
        font-size: functions.rem(32);
        margin-bottom: 20px;
    }
}

.product__description {
    font-size: functions.rem(12);
    color: var(--c-grey60);
    margin-bottom: 30px;
    font-weight: 300;

    @include media.xl-up {
        font-size: functions.rem(14);
    }
}

.sauce {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
}

.adds-card {
    background: var(--c-grey10);
    border-radius: var(--b-radius);
    position: relative;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 5px;
    align-items: stretch;
}

.adds-card__image {
    width: 82px;
    position: absolute;
    top: 0;
    left: 50%;
    translate: -50% -50%;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.adds-card__title {
    padding-top: 30px;
    font-size: functions.rem(14);
    color: var(--c-grey70);
    text-align: center;
}

.adds-card__price {
    margin-top: auto;
}

.option {
    display: flex;
    flex-direction: column;
    line-height: 1;
    text-align: center;
    gap: 2px;
}

.option__title {
    font-size: functions.rem(14);
    line-height: 1.2;
    font-weight: 700;
    font-family: var(--f-base), serif;
}

.option__price {
    font-size: functions.rem(13);
    font-weight: 400;
}
</style>
