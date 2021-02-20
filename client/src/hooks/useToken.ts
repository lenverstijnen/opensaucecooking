import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { setToken } from "../services/http.service";

export function useToken() {
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    updateToken();
  }, [user]);

  const updateToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      setToken(token);
    } catch (e) {}
  };
}
