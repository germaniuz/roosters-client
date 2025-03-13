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

export const UPDATE_CLIENT_CART = gql`
    mutation updateClientCart(
        $preset: AppGraphQLv1ClientTypesPresetFieldInput
        $product_category_option: AppGraphQLv1ClientTypesProductCategoryOptionFieldInput
    ) {
        updateClientCart(preset: $preset, product_category_option: $product_category_option) {
            user {
                id
                name
                lastname
                email
                phone
                birthday
                gender
                is_active
                fullname
            }
            items {
                quantity
                preset {
                    id
                }
                product {
                    id
                }
            }
        }
    }
`;

export const DELETE_CLIENT_CART = gql`
    mutation deleteClientCart($preset_id: Int, $product_category_option_id: Int) {
        deleteClientCart(preset_id: $preset_id, product_category_option_id: $product_category_option_id)
    }
`;
