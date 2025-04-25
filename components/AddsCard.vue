<script lang="ts" setup>
import type { CartCategoryOptionIngredient } from '~/types/Cart';
import type { CategoryOptionIngredient } from '~/types/Product';

type Props = {
    item: CategoryOptionIngredient;
};
const props = defineProps<Props>();
const activeIngredients = defineModel<CartCategoryOptionIngredient[]>({ required: true });

const activeIngredient = computed<CartCategoryOptionIngredient | null>(() => {
    return (
        activeIngredients.value.find(
            (activeIngredient) => activeIngredient.category_option_ingredient.id === props.item.id,
        ) ?? null
    );
});

const toogleIngredient = () => {
    const ingredientIndex = activeIngredients.value.findIndex(
        (activeIngredient) => activeIngredient.category_option_ingredient.id === props.item.id,
    );

    if (ingredientIndex === -1) {
        activeIngredients.value.push({
            category_option_ingredient: props.item,
            quantity: 1,
        });
    } else {
        activeIngredients.value.splice(ingredientIndex, 1);
    }
};
</script>

<template>
    <div class="adds-card" :class="{ 'adds-card--active': activeIngredient }" @click="toogleIngredient">
        <div class="adds-card__image">
            <!--            <img :src="item.ingredient.file.url" :alt="item.ingredient.name" />-->
            <img
                src="https://api.roosters-dev.ru/downloads/dd9/dd907a1313cf5d96c3f98732adaf190f.png"
                :alt="item.ingredient.name"
            />
        </div>
        <div class="adds-card__title">{{ item.ingredient.name }}</div>
        <div class="adds-card__price">{{ item.price }} ₽</div>
        <div v-if="activeIngredient" class="adds-card__check"><i class="icon-check"></i></div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.adds-card {
    background: var(--c-grey10);
    border-radius: var(--b-radius);
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    align-items: stretch;
    border: 2px solid transparent;
    transition: all 0.35s ease-in;

    &:hover {
        cursor: pointer;
        background: var(--c-grey00);
        border-color: var(--c-grey20);
    }

    &--active {
        border-color: var(--c-secondary);
        background: var(--c-grey00);

        &:hover {
            border-color: var(--c-secondary);
        }
    }
}

.adds-card__image {
    cursor: pointer;
    width: 80%;
    margin-inline: auto;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.adds-card__title {
    font-size: functions.rem(12);
    color: var(--c-grey80);
    text-align: center;
    cursor: pointer;
    line-height: 1.1;
}

.adds-card__price {
    margin-top: auto;
    font-size: functions.rem(14);
    line-height: 1;
    color: var(--c-grey80);
}

.adds-card__quantity {
    margin-top: auto;
    margin-inline: auto;
    height: 44px;
    width: 95%;
    padding-inline: 10px;
}

.adds-card__check {
    position: absolute;
    top: 3px;
    right: 3px;
    color: var(--c-primary);

    i::before {
        font-weight: 700;
    }
}
</style>
