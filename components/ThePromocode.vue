<script setup lang="ts">
import { flatten } from 'valibot';
import useValidateFormData from '~/composables/useValidateFormData';
import { PromocodeSchema, type PromocodeFields } from '~/types/Promocode';

const promo = ref<string>('');
const cartStore = useCartStore();
const { applyPromocode } = cartStore;
const { isGuest, isAuthDialogActive } = storeToRefs(useProfileStore());
const { items: cartItems } = storeToRefs(cartStore);

const promoFields = computed<PromocodeFields>(() => ({ code: promo.value }));
const { validate, formErrors } = useValidateFormData<PromocodeFields>(promoFields, PromocodeSchema);

const submitPromocode = async () => {
    const result = validate();
    if (result.success) {
        await applyPromocode(promo.value);
        promo.value = '';
    } else {
        console.error({ ...flatten(result.issues).nested });
    }
};
</script>

<template>
    <div class="promocode">
        <span>Есть промокод?</span>
        <div class="promocode__top">
            <FormInput
                v-model="promo"
                placeholder="Введите промокод"
                class="promocode__input"
                name="promocode"
                :errors="formErrors?.code"
                :disabled="isGuest || !cartItems.length"
                @keyup.enter="submitPromocode"
            />
            <BaseButton
                class="promocode__btn"
                :modifiers="['secondary', 'single-icon']"
                :disabled="isGuest || !cartItems.length"
                @click.prevent="submitPromocode"
                v-if="promo"
            >
                <BaseIcon name="arrow-right" />
            </BaseButton>
        </div>
        <div v-if="isGuest" class="promocode__login">
            Промокоды и бонусные баллы действуют только для авторизованных пользователей.
            <span class="promocode__login-link" @click="isAuthDialogActive = true">Войти</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.promocode {
    margin-top: 30px;
    max-width: 350px;
    font-size: functions.rem(16);
    line-height: functions.rem(17);
    font-weight: 400;
    font-family: var(--f-base), sans-serif;

    & > span {
        display: block;
        color: var(--c-grey90);

        @include media.lg-up {
            font-size: functions.rem(16);
            line-height: functions.rem(19);
        }
    }
}

.promocode__login {
    color: var(--c-grey60);
    margin-bottom: 36px;
    font-size: functions.rem(14);

    @include media.md-up {
        margin-bottom: 30px;
        font-size: functions.rem(16);
    }
}

.promocode__input {
    margin-block: 15px;
}

.promocode__top {
    margin-bottom: 15px;
    position: relative;
}

.promocode__btn {
    margin-bottom: 0;
    position: absolute;
    top: 50%;
    right: 8px;
    translate: 0 -50%;
    padding: 8px;
}

.promocode__login-link {
    color: var(--c-secondary);
    text-decoration: underline;
    transition: all 0.1s ease-in;

    &:hover {
        color: var(--c-primary);
        cursor: pointer;
    }
}
</style>
