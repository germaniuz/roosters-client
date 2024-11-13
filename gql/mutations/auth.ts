export const SEND_SMS_CODE = gql`
    mutation SendClientSmsCode($phone: String!) {
        sendClientSmsCode(phone: $phone) {
            code
            phone
        }
    }
`;

export const VERIFY_SMS_CODE = gql`
    mutation VerifyClientSmsCode($phone: String!, $code: String!) {
        verifyClientSmsCode(phone: $phone, code: $code) {
            token
        }
    }
`;
