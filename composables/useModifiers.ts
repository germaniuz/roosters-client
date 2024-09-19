import type { ComputedRef } from 'vue';

export const useModifiers = <TModifier>(baseClass: string, propModifiers: ComputedRef<TModifier[]>) => {
    const modifiers = computed(() =>
        propModifiers.value.length ? propModifiers.value.map((item) => baseClass + '--' + item).join(' ') : '',
    );

    return { modifiers };
};