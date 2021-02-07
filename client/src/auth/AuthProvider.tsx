import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { PropsWithChildren } from "react";
import { useHistory } from "react-router-dom";

/**
 * See https://auth0.com/blog/complete-guide-to-react-user-authentication/
 * for how this works
 */
export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  if (!domain || !clientId || !audience)
    throw Error("One or more AUTH0 environment variable are missing.");

  const redirectUri = window.location.origin;
  const history = useHistory();

  const onRedirectCallback = (appState: AppState) => {
    const path = appState?.returnTo || window.location.pathname;
    history.push(path);
  };

  // const scope = "read:current_user update:current_user_metadata";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};
