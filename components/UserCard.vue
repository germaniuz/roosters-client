<script setup lang="ts">
const { profile } = storeToRefs(useProfileStore());
</script>

<template>
    <div class="user-card">
        <div class="user-card__avatar">
            <img v-if="profile?.avatar" src="#" :alt="profile?.name ?? ''" />
            <img v-else src="/images/avatar.svg" :alt="profile?.name ?? ''" />
        </div>
        <div class="user-card__data">
            <div class="user-card__name">{{ profile?.name ?? 'Гость' }}</div>
            <BaseTextBadge :modifiers="['sm', 'secondary']"
                ><strong>150</strong> <i class="icon-pizza-slice color-primary"></i>
            </BaseTextBadge>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.user-card {
    display: flex;
    align-items: center;
    gap: 8px;
}

.user-card__avatar {
    flex: 0 0 50px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: var(--c-grey20);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
}

.user-card__data {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.user-card__name {
    font-size: functions.rem(14);
    line-height: functions.rem(14);
    color: var(--c-grey80);
}
</style>
