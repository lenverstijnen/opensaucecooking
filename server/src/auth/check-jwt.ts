import jwt from "express-jwt";
import * as jwks from "jwks-rsa";

const jwksUri = process.env.AUTH0_JWKS_URI;
const audience = process.env.AUTH0_AUDIENCE;
const issuer = process.env.AUTH0_ISSUER;
if (!jwksUri || !audience || !issuer)
  throw Error("One or more AUTH0 environment variable are missing.");

const secret = jwks.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri,
});

export const checkJwt = jwt({
  secret,
  audience,
  issuer,
  algorithms: ["RS256"],
});
