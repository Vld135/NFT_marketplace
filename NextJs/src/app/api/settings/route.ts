import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getKnex } from "../../../../knex";
import { getUserDataFromCookie } from "@/helpers/api";

export const dynamic = "force-dynamic";
export async function GET() {
  const userData = await getUserDataFromCookie();

  if (userData) {
    const knex = getKnex();
    const user = await knex("users")
      .select("username", "email", "adress")
      .where("id", userData.id)
      .first();
    return NextResponse.json({ user });
  }

  return NextResponse.json({
    error: "You don't have permission to access this api",
  });
}
