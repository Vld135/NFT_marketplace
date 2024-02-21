import { cookies } from "next/headers";
import { JWTPayload, SignJWT, jwtVerify } from "jose";

interface IJWTPayload {
  id: string;
  email: string;
}

export const validateToken = async (
  token: string | undefined
): Promise<null | IJWTPayload> => {
  if (token) {
    const enc = new TextEncoder();
    const secretKey = enc.encode("Secret");
    try {
      const { payload }: { payload: IJWTPayload } = await jwtVerify(token, secretKey);
      return payload;
    } catch (error) {
      return null;
    }
  }
  return null;
};

export const createToken = async (payload: JWTPayload) => {
  const enc = new TextEncoder();
  const token = await new SignJWT(payload) // details to  encode in the token
    .setProtectedHeader({ alg: "HS256" }) // algorithm
    .setExpirationTime("1 day") // token expiration time, e.g., "1 day"
    .sign(enc.encode("Secret"));
  return token;
};

export const getUserDataFromCookie = () => {
  const token = cookies().get("Token")?.value;

  return validateToken(token);
};
