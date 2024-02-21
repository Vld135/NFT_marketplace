"use server";

import { getKnex } from "../../../knex";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createToken } from "@/helpers/api";

export const createAccount = async (formData: FormData) => {
  const username = formData?.get("username");
  const email = formData?.get("email");
  const password = formData?.get("password");
  const confirmPassword = formData?.get("confirmPassword");

  if (password !== confirmPassword) {
    return { error: "Confirm Password is not correct" };
  }

  const knex = getKnex();
  const users = await knex
    .select("username", "email")
    .from("users")
    .where("username", username)
    .orWhere("email", email);

  if (users.length) {
    return { error: "User with this email or username already axist!" };
  }

  const resp = (
    await knex("users").insert({ username, email, password }, ["id"])
  )[0];

  if (resp) {
    const token = await createToken(resp);
    cookies().set("Token", token);
    redirect("/profile");
  }
};
