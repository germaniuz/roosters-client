<script lang="ts" setup>
import { CART_PATH, PROFILE_PATH } from '~/constants/routing';

const route = useRoute();
const { cartCount } = storeToRefs(useCartStore());
const { isGuest, isAuthenticated, isAuthDialogActive } = storeToRefs(useProfileStore());

const baseNavigationItems: NavigationItem[] = [
    {
        label: 'Меню',
        path: '/',
        icon: 'pizza-slice',
        isLink: true,
    },
    {
        label: 'Акции',
        path: '/discount',
        icon: 'discount',
        isLink: true,
    },
    {
        label: 'Корзина',
        path: CART_PATH,
        icon: 'cart',
        badge: cartCount,
        isLink: true,
    },
];

const profileItem = computed(() => {
    if (isAuthenticated.value) {
        return {
            label: 'Профиль',
            path: PROFILE_PATH,
            icon: 'avatar',
            isLink: true,
        };
    } else {
        return {
            label: 'Войти',
            path: '#',
            icon: 'avatar',
            isLink: false,
        };
    }
});

const navigationItems = computed(() => [...baseNavigationItems, profileItem.value]);

// TODO: Move this interface to a shared types file
interface NavigationItem {
    label: string;
    path: string;
    icon: string;
    badge?: ComputedRef<number>;
    isLink?: boolean;
}

const handleProfileClick = () => {
    if (isGuest.value) {
        isAuthDialogActive.value = true;
    }
};

const isActive = (item: NavigationItem) => {
    if (item.path === '/') {
        return route.path === '/';
    }
    if (item.path === '#') {
        return false; // Login button is never active
    }
    return route.path.startsWith(item.path);
};
</script>

<template>
    <nav class="mobile-bottom-nav">
        <template v-for="item in navigationItems" :key="item.path">
            <NuxtLink
                v-if="item.isLink !== false"
                :to="item.path"
                class="mobile-bottom-nav__item"
                :class="{ 'mobile-bottom-nav__item--active': isActive(item) }"
            >
                <div class="mobile-bottom-nav__icon">
                    <BaseIcon :name="item.icon" />
                    <div v-if="item?.badge && item?.badge.value > 0" class="mobile-bottom-nav__badge">
                        {{ item.badge.value }}
                    </div>
                </div>
                <span class="mobile-bottom-nav__label">{{ item.label }}</span>
            </NuxtLink>
            <button v-else class="mobile-bottom-nav__item" @click="handleProfileClick">
                <div class="mobile-bottom-nav__icon">
                    <BaseIcon :name="item.icon" />
                </div>
                <span class="mobile-bottom-nav__label">{{ item.label }}</span>
            </button>
        </template>
    </nav>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.mobile-bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    border-top: 1px solid var(--c-grey-20);
    box-shadow: 0 -2px 4px 1px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: functions.rem(8) functions.rem(12);
    z-index: var(--z-middle);
    min-height: functions.rem(60);

    @include media.md-up {
        display: none;
    }
}

.mobile-bottom-nav__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: var(--c-grey-60);
    transition: color 0.2s ease;
    flex: 1;
    max-width: functions.rem(80);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: inherit;

    &:hover {
        color: var(--c-primary);
    }

    &--active {
        color: var(--c-primary);
    }
}

.mobile-bottom-nav__icon {
    position: relative;
    font-size: functions.rem(32);
    margin-bottom: functions.rem(4);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: functions.rem(24);
    color: var(--c-secondary);

    .mobile-bottom-nav__item--active & {
        color: var(--c-primary);
    }
}

.mobile-bottom-nav__badge {
    position: absolute;
    top: functions.rem(-4);
    right: functions.rem(-4);
    background: var(--c-primary);
    color: var(--c-grey-00);
    border-radius: 50%;
    min-width: functions.rem(16);
    height: functions.rem(16);
    font-size: functions.rem(10);
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.mobile-bottom-nav__label {
    font-size: functions.rem(12);
    line-height: 1.2;
    text-align: center;
    font-weight: 500;
}
</style>
