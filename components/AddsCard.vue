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

const addIngredient = () => {
    const ingredientIndex = activeIngredients.value.findIndex(
        (activeIngredient) => activeIngredient.category_option_ingredient.id === props.item.id,
    );
    console.log(ingredientIndex);

    if (ingredientIndex === -1) {
        activeIngredients.value.push({
            category_option_ingredient: props.item,
            quantity: 1,
        });
    } else {
        activeIngredients.value[ingredientIndex].quantity = activeIngredients.value[ingredientIndex].quantity + 1;
    }
};
const removeIngredient = () => {
    const ingredientIndex = activeIngredients.value.findIndex(
        (activeIngredient) => activeIngredient.category_option_ingredient.id === props.item.id,
    );
    if (ingredientIndex === -1) {
        return;
    }
    if (activeIngredients.value[ingredientIndex].quantity === 1) {
        activeIngredients.value.splice(ingredientIndex, 1);
    } else {
        activeIngredients.value[ingredientIndex].quantity--;
    }
};
</script>

<template>
    <div class="adds-card">
        <div class="adds-card__image">
            <img :src="item.ingredient.file.url" :alt="item.ingredient.name" />
        </div>
        <div class="adds-card__title">{{ item.ingredient.name }}</div>
        <QuantityHandler
            v-if="activeIngredient"
            class="adds-card__quantity"
            :quantity="activeIngredient.quantity"
            :increase-handler="addIngredient"
            :decrease-handler="removeIngredient"
            theme="primary"
        />
        <BaseButton v-else :modifiers="['light']" class="adds-card__price" @click="addIngredient">
            {{ item.price }} ₽
        </BaseButton>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

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

.adds-card__quantity {
    margin-top: auto;
    margin-inline: auto;
    height: 44px;
    width: 95%;
    padding-inline: 10px;
}
</style>
