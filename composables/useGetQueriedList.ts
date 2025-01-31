import type { Ref } from 'vue';
import { getFieldName } from '~/utils/apollo';
import type { QueryList } from '~/types/Query';

export const useGetQueriedList = <T, U>(data: Ref<T | null>) => {
    const list = computed(() => {
        let queriedList = null;
        if (data.value) {
            let fieldName = getFieldName(data.value) as keyof typeof data.value;
            queriedList = data.value[fieldName] as QueryList<U>;
        }

        return queriedList;
    });

    return {
        list,
    };
};
