import { gql } from "@apollo/client";

const GET_EVENT = gql`
  {
    feeDonateds(first: 5) {
      id
      donator
      amountDonated
      blockNumber
    }
  }
`;

export default GET_EVENT;
