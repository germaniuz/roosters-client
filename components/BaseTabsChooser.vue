<script setup lang="ts" generic="TItem extends Record<string, unknown>">
type Props<TItem> = {
    tabs: Array<TItem>;
    itemKey: string;
    label?: string;
};
defineProps<Props<TItem>>();

const activeTab = defineModel<TItem>({ required: true });
</script>

<template>
    <label class="label">{{ label }}</label>
    <div id="some-block" class="tabs-chooser">
        <div class="card card--p-xs card--grey tabs-chooser__btns">
            <span
                v-for="item in tabs"
                :key="'tab-' + item[itemKey]"
                class="tabs-chooser__btn"
                :class="{ 'tabs-chooser__btn--active': item[itemKey] === activeTab[itemKey] }"
                data-target-tab="first-tab"
                @click="activeTab = item"
            >
                <slot :item="item" name="btn"></slot>
            </span>
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

.tabs-chooser__btns {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 20px;
    width: 100%;
    border-radius: var(--b-radius);

    @include media.md-down {
        flex-wrap: wrap;
    }
}

.tabs-chooser__btn {
    padding: 12px 25px;
    font-family: var(--f-headings), serif;
    font-size: functions.rem(14);
    font-weight: 700;
    border-radius: var(--b-radius-md);
    color: var(--c-grey60);
    flex: 1;
    text-align: center;

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
</style>
