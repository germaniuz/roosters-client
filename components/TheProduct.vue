<script setup lang="ts">
import type { Product, ProductCategoryOption, ProductIngredient } from '~/types/Product';
import { useProductStore } from '~/stores/product';
import { useCartStore } from '~/stores/cartStore';
import BaseBadge from '~/components/BaseBadge.vue';
import type { CartCategoryOptionIngredient } from '~/types/Cart';
import { useDeliveryStore } from '~/stores/deliveryStore';

type Props = {
    product: Product;
};
const props = defineProps<Props>();

const { closeProductDialog } = useProductStore();
const { createCartItem, createLocalCartItem } = useCartStore();
const { isGuest } = storeToRefs(useProfileStore());
const { pickupLocalStorage, deliveryLocalStorage, isDeliveryChooserOpen } = storeToRefs(useDeliveryStore());

const activeProductCategoryOption = ref<ProductCategoryOption>(props.product.product_category_options[0]);
watch(
    activeProductCategoryOption,
    () => {
        activeIngredients.value = [];
    },
    {
        deep: true,
    },
);

const activeIngredients = ref<CartCategoryOptionIngredient[]>([]);
const adds = computed(() =>
    props.product.category.category_options_ingredient.filter(
        (item) => item.category_options.id === activeProductCategoryOption.value.category_option.id,
    ),
);

const excludeIngredients = ref<ProductIngredient[]>([]);
const toggleIngredient = (ingredient: ProductIngredient) => {
    if (excludeIngredients.value.findIndex((item) => item.id === ingredient.id) > -1) {
        excludeIngredients.value = [...excludeIngredients.value.filter((item) => item.id !== ingredient.id)];
    } else {
        excludeIngredients.value.push(ingredient);
    }
};

const addToCart = async () => {
    if (!pickupLocalStorage.value && !deliveryLocalStorage.value) {
        closeProductDialog();
        isDeliveryChooserOpen.value = true;

        return;
    }

    if (isGuest.value) {
        createLocalCartItem({
            quantity: 1,
            product: {
                ...activeProductCategoryOption.value,
                product: props.product,
            },
            cart_category_option_ingredients: activeIngredients.value,
            exclude_product_ingredients: excludeIngredients.value,
        });
        closeProductDialog();

        return;
    }

    await createCartItem({
        product_category_option: {
            product_category_option_id: activeProductCategoryOption.value.id,
            quantity: 1,
        },
        cart_category_option_ingredients: activeIngredients.value.map((ingredient) => ({
            category_option_ingredient_id: ingredient.category_option_ingredient.id,
            quantity: ingredient.quantity,
        })),
        exclude_product_ingredient_ids: excludeIngredients.value.map((item) => item.id),
    });
    closeProductDialog();
};

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
]);
const activeSauce = ref(sauces.value[0]);

const isDataInfoShowed = ref(false);

const totalPrice = computed(() => {
    return (
        activeProductCategoryOption.value.price +
        activeIngredients.value.reduce((acc, item) => acc + item.quantity * item.category_option_ingredient.price, 0)
    );
});
</script>

<template>
    <div class="product">
        <div class="product__image">
            <BaseBadge
                v-if="product.badges"
                class="product__badge"
                :image="product.badges[0].file.url"
                :alt="product.badges[0].file.name"
            />
            <img
                src="https://api.roosters-dev.ru/downloads/df8/df8372c7403f15a75b045bdf578f3ecf.png"
                :alt="product.name"
            />
            <!--            <img :src="product.file.url" :alt="product.name" />-->
            <div
                class="product__info"
                @mouseenter="isDataInfoShowed = true"
                @mouseleave="isDataInfoShowed = false"
                @click="isDataInfoShowed = !isDataInfoShowed"
            >
                <i class="icon-info"></i>
            </div>
            <div v-if="isDataInfoShowed" class="product__info-data">
                <div class="product__info-title">Пищевая ценность на 100г:</div>
                <table>
                    <tbody>
                        <tr>
                            <td>Энергетическая ценность</td>
                            <td>{{ product.energy_value }}&nbsp;ккал</td>
                        </tr>
                        <tr>
                            <td>Белки</td>
                            <td>{{ product.nutritional_value_proteins }}&nbsp;г</td>
                        </tr>
                        <tr>
                            <td>Жиры</td>
                            <td>{{ product.nutritional_value_fats }}&nbsp;г</td>
                        </tr>
                        <tr>
                            <td>Углеводы</td>
                            <td>{{ product.nutritional_value_carbs }}&nbsp;г</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="product__data">
            <div class="product__title">{{ product.name }}</div>
            <div class="product__description">
                {{ product.description }},
                <span
                    v-for="ingredient in props.product.product_ingredients"
                    :key="ingredient.id"
                    class="product__editable-ingredient"
                    :class="{
                        'product__editable-ingredient--exclude':
                            excludeIngredients.findIndex((item) => item.id === ingredient.id) > -1,
                    }"
                    @click="toggleIngredient(ingredient)"
                    >{{ ingredient.ingredient.name.toLowerCase() }}</span
                >
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
                    <AddsCard v-for="item in adds" :key="item.id" v-model="activeIngredients" :item="item" />
                </div>
                <BaseButton :modifiers="['primary']" class="w-100 product__add-btn" @click="addToCart"
                    >В корзину за {{ totalPrice }}&nbsp;₽
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.product {
    --product-height: 80svh;

    display: grid;
    gap: 40px;
    align-items: start;
    height: 100%;
    max-height: var(--product-height);

    @include media.md-down {
        width: 80vw;
    }

    @include media.lg-only {
        width: 80vw;
        max-width: 760px;
    }

    @include media.lg-up {
        --product-height: 564px;
        grid-template-columns: 33fr 67fr;
    }

    @include media.xl-up {
        grid-template-columns: 380px 440px;
    }

    & > * {
        min-width: 0;
        min-height: 0;
    }
}

.product__image {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    flex: 0 0 100%;
    justify-content: center;
    max-height: var(--product-height);

    img {
        width: 100%;
        object-fit: contain;
        transition: all 0.75s ease-in-out;
        z-index: var(--z-top-10);
        position: relative;
        left: 0;
        top: 0;

        @include media.xl-up {
            width: 380px;
        }

        &:hover {
            scale: 1.1;
            cursor: pointer;
        }
    }
}

.product__badge {
    margin-inline: auto;
}

.product__info {
    position: absolute;
    top: 20px;
    left: 20px;
    color: var(--c-secondary);
    background: var(--c-secondary-light);
    border-radius: 50%;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: functions.rem(24);
    cursor: pointer;

    @include media.lg-up {
        left: initial;
        right: 20px;
    }
}

.product__data {
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;

    @include media.lg-up {
        max-height: var(--product-height);
    }

    &::-webkit-scrollbar {
        display: none;
    }
}

.product__title {
    font-size: functions.rem(24);
    line-height: functions.rem(36);
    font-weight: 600;
    font-family: var(--f-headings), serif;
    color: var(--c-grey90);
    margin-bottom: 5px;

    @include media.xl-up {
        font-size: functions.rem(32);
    }
}

.product__subtitle {
    font-size: functions.rem(16);
    color: var(--c-grey90);
    margin-bottom: 12px;
}

.product__description {
    font-size: functions.rem(14);
    color: var(--c-grey90);
    margin-bottom: 12px;
    font-weight: 300;

    @include media.xl-up {
        font-size: functions.rem(14);
    }
}

.product__editable-ingredient {
    cursor: pointer;
    transition: all 0.25s ease-in-out;

    &:hover {
        text-decoration: line-through;
    }

    &--exclude {
        text-decoration: line-through;
    }
}

.sauce {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
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
}

.option__price {
    font-size: functions.rem(13);
    font-weight: 400;
}

.product__add-btn {
    position: sticky;
    bottom: 0;
    border: 4px solid var(--c-grey00);
    font-size: functions.rem(16);

    @include media.lg-up {
        translate: 0 2px;
    }
}

.product__info-data {
    position: absolute;
    top: 50px;
    left: 30px;
    background: color(from var(--c-grey90) srgb r g b / 0.9);
    color: var(--c-grey20);
    font-size: functions.rem(14);
    font-weight: 300;
    border-radius: var(--b-radius);
    padding: 10px;

    @include media.lg-up {
        left: initial;
        right: 70px;
        top: 20px;
    }

    td {
        padding: 1px 5px;
    }
}

.product__info-title {
    margin-bottom: 5px;
}
</style>
