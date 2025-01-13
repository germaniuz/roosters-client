export const CREATE_CLIENT_CART = gql`
    mutation createClientCart(
        $preset: AppGraphQLv1ClientTypesPresetFieldInput
        $product_category_option: AppGraphQLv1ClientTypesProductCategoryOptionFieldInput
    ) {
        createClientCart(preset: $preset, product_category_option: $product_category_option) {
            items {
                quantity
                product {
                    product {
                        name
                    }
                }
            }
        }
    }
`;
