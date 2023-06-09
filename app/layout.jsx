import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
export const metadata = {
  title: "Prompt - поделись интересным запросом к AI прямо сейчас!",
  description: "Discover & Share",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <link rel="icon" href="assets/images/logo.svg" sizes="16x16" type="image/png"></link>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
