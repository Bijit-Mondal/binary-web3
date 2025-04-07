import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import ThirdParty, {
  Github,
  Google,
  Facebook,
  Apple,
} from "supertokens-auth-react/recipe/thirdparty";
import Session from "supertokens-auth-react/recipe/session";
import * as reactRouterDom from "react-router-dom";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import PasswordLess from "supertokens-auth-react/recipe/passwordless";
import Contests from "./Contests.jsx";
import PlayerSelection from "./PlayerSelection.jsx";
import CaptainSelection from "./CaptainSelection.jsx";
import { WalletProvider } from "./contexts/WalletContext";
import Profile from "./components/Profile.jsx";
import { RecoilRoot } from "recoil";
import StakeD11Tokens from "./components/Stake11Tokens.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Premium from "./components/Premium.jsx";
import Error404 from "./components/Error404.jsx";

SuperTokens.init({
  appInfo: {
    appName: "Gamezy",
    apiDomain: import.meta.env.VITE_APP_API_DOMAIN || "http://localhost:3000",
    websiteDomain:
      import.meta.env.VITE_APP_WEBSITE_DOMAIN ||
      "http://localhost:5173",
    apiBasePath: "/api/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [
          Github.init(),
          Google.init(),
          Facebook.init(),
          Apple.init(),
        ],
      },
    }),
    Session.init(),
    PasswordLess.init({
      contactMethod: "EMAIL_OR_PHONE",
      flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
    }),
  ],
});

createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <SuperTokensWrapper>
      <WalletProvider>
        <BrowserRouter>
          <Routes>
            {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
              ThirdPartyPreBuiltUI,
              PasswordlessPreBuiltUI,
            ])}

            <Route
              path="/dashboard"
              element={
                <SessionAuth>
                  {/*Components that require to be protected by authentication*/}
                  <App />
                </SessionAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <SessionAuth>
                  {/*Components that require to be protected by authentication*/}
                  <Profile />
                </SessionAuth>
              }
            />
            <Route
              path="/contests"
              element={
                <SessionAuth>
                  {/*Components that require to be protected by authentication*/}
                  <Contests />
                </SessionAuth>
              }
            />
            <Route
              path="/playerselection"
              element={
                <SessionAuth>
                  {/*Components that require to be protected by authentication*/}
                  <PlayerSelection />
                </SessionAuth>
              }
            />
            <Route
              path="/captainselection"
              element={
                <SessionAuth>
                  {/*Components that require to be protected by authentication*/}
                  <CaptainSelection />
                </SessionAuth>
              }
            />
            <Route
              path="/stake"
              element={
                <SessionAuth>
                  {/*Components that require to be protected by authentication*/}
                  <StakeD11Tokens />
                </SessionAuth>
              }
            />
            <Route path="/" element={<LandingPage />} />
            <Route path="/premium" element={<Premium />} />

            <Route path="/app" element={<App />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </SuperTokensWrapper>
  </RecoilRoot>,
);
