import type { DollarApollo } from '@vue/apollo-option/types/vue-apollo';

declare module '#app' {
    interface NuxtApp {
        $apollo: DollarApollo<unknown>;
    }
}

declare module '*.gql' {
    import type { DocumentNode } from 'graphql';
    const Schema: DocumentNode;
    export = Schema;
}

declare module '*.graphql' {
    import type { DocumentNode } from 'graphql';
    const Schema: DocumentNode;
    export = Schema;
}

// It is always important to ensure you import/export something when augmenting a type
export {};
