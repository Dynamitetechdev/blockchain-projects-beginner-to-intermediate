import Link from "next/link";
import { ConnectButton } from "web3uikit";
const Header = () => {
  return (
    <div className="navigator">
      <div className="logo">
        <h1>Build The World</h1>
      </div>

      <div className="nav-bar">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/donators">Donators</Link>
          </li>
          <ConnectButton />
        </ul>
      </div>
    </div>
  );
};

export default Header;
