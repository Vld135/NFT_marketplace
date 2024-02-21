"use server";
import { getKnex } from "../../../knex";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ethers } from "ethers";
import { createToken } from "@/helpers/api";

export const login = async (formData: FormData) => {
  const email = formData?.get("email");
  const password = formData?.get("password");

  const knex = getKnex();
  const user = await knex
    .select("id", "email")
    .from("users")
    .where({ email, password })
    .first();

  if (user) {
    const token = await createToken(user);
    cookies().set("Token", token);
    redirect("/profile");
  } else {
    return { error: "Email or password is not correct!" };
  }
};

export const getNonce = async (adress: string) => {
  const knex = getKnex();
  const user = await knex("users")
    .select("nonce")
    .where("adress", adress)
    .first();

  if (!user) {
    return { error: "User not found!" };
  }

  return { nonce: user.nonce };
};

export const loginByMetamask = async ({
  message,
  signature,
  adress,
}: {
  message: string;
  signature: string;
  adress: string;
}) => {
  const knex = getKnex();

  const user = await knex("users")
    .select("id", "email", "nonce")
    .where("adress", adress)
    .first();

  if (!user) {
    return { error: "User not found!" };
  }

  const recoveredAdress = ethers.utils.verifyMessage(message, signature);

  if (recoveredAdress !== adress) {
    return { error: "Signature is not correct!" };
  }

  const newNonce = Math.floor(Math.random() * 1000000);
  await knex("users").where("adress", adress).update("nonce", newNonce);

  const token = await createToken(user);

  cookies().set("Token", token);
  redirect("/profile");
};
