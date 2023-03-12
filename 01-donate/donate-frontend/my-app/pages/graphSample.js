import { useQuery, gql } from "@apollo/client";

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

const GraphSample = () => {
  const { data, loading, error } = useQuery(GET_EVENT);
  console.log(data);
  return <h1>Hello</h1>;
};

export default GraphSample;
