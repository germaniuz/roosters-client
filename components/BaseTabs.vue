<script setup lang="ts" generic="TItem extends Record<string, unknown>">
type Props<TItem> = {
    tabs: Array<TItem>;
    itemKey: string;
    label?: string;
};
defineProps<Props<TItem>>();

const activeTabIndex = ref(0);
</script>

<template>
    <label class="label">{{ label }}</label>
    <div id="some-block" class="tabs">
        <div class="card card--p-xs card--grey tabs__btns">
            <span
                v-for="(item, index) in tabs"
                :key="'tab-' + item[itemKey]"
                class="tabs__btn"
                :class="{ 'tabs__btn--active': index === activeTabIndex }"
                data-target-tab="first-tab"
                @click="activeTabIndex = index"
            >
                <slot :item="item" name="btn"></slot>
            </span>
        </div>
        <div class="tabs__tabs">
            <div
                v-for="(item, index) in tabs"
                :id="'tab-' + item[itemKey]"
                :key="'tab-' + item[itemKey]"
                class="tabs__tab"
                :class="{ 'tabs__tab--active': index === activeTabIndex }"
            >
                <slot name="tab" :item="item"></slot>
            </div>
            <div id="second-tab" class="tabs__tab">Second tab</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.tabs-chooser {
    width: 100%;
    max-width: var(--w-content);
}

.tabs__btns {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;

    @include media.md-down {
        flex-wrap: wrap;
    }
}

.tabs__btn {
    padding: 12px 25px;
    font-family: var(--f-headings), serif;
    font-size: functions.rem(12);
    font-weight: 500;
    border-radius: var(--b-radius-sm);
    color: var(--c-grey60);

    @include media.md-down {
        flex: 1;
        white-space: nowrap;
    }

    &:hover {
        cursor: pointer;
    }

    &--active {
        background: var(--c-grey00);
        color: var(--c-primary);
    }
}

.tabs__tab {
    display: none;

    &--active {
        display: block;
    }
}
</style>
