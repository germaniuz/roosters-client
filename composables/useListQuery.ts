import { getFieldName } from '~/utils/apollo';
import type { QueryList } from '~/types/Query';
import type { DocumentNode } from 'graphql/language';
import type { OperationVariables } from '@apollo/client';
// @ts-expect-error | cannot find declaration fro module @vue/apollo-composable/dist/useQuery
import type { VariablesParameter } from '@vue/apollo-composable/dist/useQuery';

export const useListQuery = <TItem>(query: DocumentNode, params?: VariablesParameter<OperationVariables>) => {
    const { result, refetch, error } = useQuery(query, params);
    const items = computed<TItem[]>(() => {
        if (result.value) {
            const fieldName = getFieldName(result.value) as keyof typeof result.value;
            const queriedList = result.value[fieldName] as QueryList<TItem>;

            return queriedList.items;
        }

        return [];
    });

    return {
        items,
        refetch,
        error,
    };
};
