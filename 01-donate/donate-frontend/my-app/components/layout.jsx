import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import Header from "./header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/43180/donate-contract/v0.0.1 ",
});
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <NotificationProvider>
        <ApolloProvider client={client}>
          <MoralisProvider initializeOnMount={false}>
            <Header />
            {children}
          </MoralisProvider>
        </ApolloProvider>
      </NotificationProvider>
    </div>
  );
};

export default Layout;
