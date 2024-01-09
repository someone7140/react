import * as jwt from "jsonwebtoken";

const JWT_SETTING = JSON.parse(process.env.HASURA_GRAPHQL_JWT_SECRET ?? "{}");
interface PayloadObjectType extends jwt.JwtPayload {}

export const makeJwtToken = (payload: PayloadObjectType, expiresIn: string) => {
  return jwt.sign(payload, JWT_SETTING.key, {
    algorithm: JWT_SETTING.type,
    expiresIn,
  });
};

export const decodeJwtToken = <T extends jwt.JwtPayload>(token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SETTING.key, {
      algorithms: [JWT_SETTING.type],
    }) as T;
    return decoded;
  } catch (e) {
    throw e;
  }
};
