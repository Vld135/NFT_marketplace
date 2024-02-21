"use server";

import { ethers } from "ethers";
import { getKnex } from "../../../knex";
import { revalidatePath } from "next/cache";

export const connectMetamask = async ({
  message,
  signature,
  adress,
  email,
}: {
  message: string;
  signature: string;
  adress: string;
  email: string;
}) => {
  //TODO need get email from token
  const knex = getKnex();
  const user = await knex("users")
    .select("adress", "email")
    .where("email", email)
    .orWhere("adress", adress)
    .first();

  if (user.adress) {
    if (user.email === email) {
      return { error: "Metamask already connected to your account!" };
    } else {
      return { error: "Metamask already connected to another account!" };
    }
  }

  const recoveredAdress = ethers.utils.verifyMessage(message, signature);

  if (recoveredAdress !== adress) {
    return { error: "" };
  }

  const nonce = Math.floor(Math.random() * 1000000);
  await knex("users").where("email", email).update({ adress, nonce });

  revalidatePath("/settings/general");
  return { success: true };
};
