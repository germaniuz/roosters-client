import { getFieldName } from '~/utils/apollo';
import type { QueryList } from '~/types/Query';
import type { DocumentNode } from 'graphql/language';
import { useQuery } from 'villus';

export const useAsyncListQuery = async <TItem>(query: DocumentNode, params?: object) => {
    const { data, execute } = await useQuery({ query, variables: params });
    let queriedList = null;
    const count = ref(0);
    if (data.value) {
        const fieldName = getFieldName(data.value) as keyof typeof data.value;
        queriedList = data.value[fieldName] as QueryList<TItem>;
    }

    if (queriedList === null) {
        throw new Error('There is no data');
    }

    const items = ref<TItem[]>(queriedList.items);
    count.value = queriedList.count ?? 0;

    return {
        items,
        count,
        execute,
    };
};
