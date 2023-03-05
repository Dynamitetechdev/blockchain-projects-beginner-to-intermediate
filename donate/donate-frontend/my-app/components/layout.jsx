import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <NotificationProvider>
        <MoralisProvider initializeOnMount={false}>
          <Header />
          {children}
        </MoralisProvider>
      </NotificationProvider>
    </div>
  );
};

export default Layout;
