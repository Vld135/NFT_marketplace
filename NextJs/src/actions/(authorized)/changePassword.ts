"use server";
import { getUserDataFromCookie } from "@/helpers/api";
import { getKnex } from "../../../knex";

export const changePassword = async (data: FormData) => {
  const currentPassword = data?.get("currentPassword");
  const newPassword = data?.get("newPassword");
  const confirmPassword = data?.get("confirmPassword");

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const knex = getKnex();
  const userData = await getUserDataFromCookie();

  if (userData) {
    const userFromDb = await knex("users")
      .select("password")
      .where("id", userData.id)
      .first();

    if (userFromDb.password !== currentPassword) {
      return { error: "Current password is not correct" };
    }

    await knex("users")
      .update({ password: newPassword })
      .where("id", userData.id);
  }
};
