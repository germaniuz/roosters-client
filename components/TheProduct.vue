<script setup lang="ts">
import type { Product, ProductCategoryOption } from '~/types/Product';
import { CREATE_CLIENT_CART } from '~/gql/mutations/clientCart';
import { useProductStore } from '~/stores/product';
import { useCartStore } from '~/stores/cartStore';
import BaseBadge from '~/components/BaseBadge.vue';
import { useMutation } from 'villus';

type Props = {
    product: Product;
};
const props = defineProps<Props>();

const { isGuest, pickupShop, activeDeliveryAddress, isDeliveryChooserOpen } = storeToRefs(useProfileStore());

const ingredients = computed(() => props.product.product_ingredients.map((i) => i.ingredient.name).join(', '));

const activeProductCategoryOption = ref<ProductCategoryOption>(props.product.product_category_options[0]);

const { execute } = useMutation(CREATE_CLIENT_CART);
const { closeProductDialog } = useProductStore();
const { updateCartQuery } = useCartStore();

const addToCart = async () => {
    if (!pickupShop.value && !activeDeliveryAddress.value) {
        closeProductDialog();
        isDeliveryChooserOpen.value = true;

        return;
    }

    if (!isGuest.value) {
        closeProductDialog();
        // TODO open auth modal
        return;
    }

    await execute({
        product_category_option: {
            product_category_option_id: activeProductCategoryOption.value.id,
            quantity: 1,
        },
    });
    closeProductDialog();
    updateCartQuery();
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

const isDataInfoShowed = ref(false);
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
            <img :src="product.file.url" :alt="product.name" />
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
                {{ product.description + ', ' + ingredients }}
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
                <BaseButton :modifiers="['primary']" class="w-100 product__add-btn" @click="addToCart"
                    >В корзину за {{ activeProductCategoryOption.price }}&nbsp;₽
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/helpers/media';
@use '../assets/styles/helpers/functions';

.product {
    --product-height: 730px;

    display: grid;
    gap: 40px;
    align-items: start;
    height: 100%;
    max-height: var(--product-height);

    @include media.md-up {
        grid-template-columns: 245px 480px;
    }

    @include media.xl-up {
        grid-template-columns: 380px 480px;
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
        width: 245px;
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
            scale: 1.8;
            left: 250px;
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
    max-height: var(--product-height);
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

.product__title {
    font-size: functions.rem(24);
    line-height: functions.rem(36);
    font-weight: 700;
    font-family: var(--f-headings), serif;
    color: var(--c-grey90);
    margin-bottom: 5px;

    @include media.xl-up {
        font-size: functions.rem(32);
    }
}

.product__subtitle {
    font-size: functions.rem(20);
    color: var(--c-grey90);
    margin-bottom: 12px;
}

.product__description {
    font-size: functions.rem(12);
    color: var(--c-grey60);
    margin-bottom: 12px;
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

.product__add-btn {
    position: sticky;
    bottom: 0;
    border: 6px solid var(--c-grey00);
    border-radius: var(--b-radius);
    font-size: functions.rem(16);
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
