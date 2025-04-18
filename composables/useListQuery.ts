import { getFieldName } from '~/utils/apollo';
import type { QueryList } from '~/types/Query';
import type { DocumentNode } from 'graphql/language';
import type { OperationVariables } from '@apollo/client';
// @ts-expect-error | cannot find declaration fro module @vue/apollo-composable/dist/useQuery
import type { VariablesParameter } from '@vue/apollo-composable/dist/useQuery';
import { useQuery } from 'villus';

export const useListQuery = <TItem>(query: DocumentNode, params?: VariablesParameter<OperationVariables>) => {
    const { data, error, execute, onData } = useQuery({
        query,
        variables: params,
    });
    const items = ref<Array<TItem>>([]);
    if (data.value) {
        const fieldName = getFieldName(data.value) as keyof typeof data.value;
        const queriedList = data.value[fieldName] as QueryList<TItem>;

        items.value = queriedList?.items ?? [];
    }
    const count = computed(() => {
        if (data.value) {
            const fieldName = getFieldName(data.value) as keyof typeof data.value;
            const queriedList = data.value[fieldName] as QueryList<TItem>;

            return queriedList.count ?? 0;
        } else {
            return 0;
        }
    });

    watch(data, () => {
        if (data.value) {
            const fieldName = getFieldName(data.value) as keyof typeof data.value;
            const queriedList = data.value[fieldName] as QueryList<TItem>;
            items.value = queriedList?.items ?? [];
        }
    });

    return {
        items,
        count,
        execute,
        error,
        onData,
    };
};
