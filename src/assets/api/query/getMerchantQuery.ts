import { gql } from "@apollo/client";

export default gql`
	query GetMerchantQuery {
		getMerchantQuery {
			code
			success
			result {
				Merchant
				State
				State_Abbreviation
				Lat
				Lang
			}
		}
	}
`;
