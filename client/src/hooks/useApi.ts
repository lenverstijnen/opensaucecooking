// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect, useState } from "react";

// interface Api<T> {
//   error: null | string;
//   loading: boolean;
//   data: T | null;
// }

// export const useApi = <T>(name: string) => {
//   const { getAccessTokenSilently } = useAuth0();
//   const [state, setState] = useState<Api<T>>({
//     error: null,
//     loading: true,
//     data: null,
//   });

//   useEffect(() => {
//       const fetch = async () => {
//           const accessToken = getAccessTokenSilently();

//       }
//   });
// };
