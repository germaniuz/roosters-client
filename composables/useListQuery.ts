import { getFieldName } from '~/utils/apollo';
import type { QueryList } from '~/types/Query';
import type { DocumentNode } from 'graphql/language';

export const useListQuery = <TItem>(query: DocumentNode, params?: any) => {
    const { result, refetch, error } = useQuery(query, params);
    const items = computed<TItem[]>(() => {
        if (result.value) {
            let fieldName = getFieldName(result.value) as keyof typeof result.value;
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
