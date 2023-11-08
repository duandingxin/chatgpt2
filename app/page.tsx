import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";
import styles from "./styles/globals.scss";
import { getServerSideConfig } from "./config/server";

const serverConfig = getServerSideConfig();

export default async function App() {
  return (
    <>
      <Home />
      {serverConfig?.isVercel && <Analytics />}
      <div>
        <a href="javascript:;">蜀ICP备2023014364号-1</a>
      </div>
    </>
  );
}
