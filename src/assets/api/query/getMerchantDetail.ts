import { gql } from "@apollo/client";

export default gql`
    query getMerchantDetails(
      $amount: Int
      ) {
  getMerchantDetails(
    amount: $amount
    ) {
      code
      success
      message
      result
  }
}
`;