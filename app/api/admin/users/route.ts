import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { admins } from "@/db/schema";
import { hash } from "bcryptjs";
import { asc } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await db
    .select({
      id: admins.id,
      name: admins.name,
      email: admins.email,
      createdAt: admins.createdAt,
    })
    .from(admins)
    .orderBy(asc(admins.createdAt));

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const passwordHash = await hash(password, 12);

  try {
    const [created] = await db
      .insert(admins)
      .values({ name, email, passwordHash })
      .returning({
        id: admins.id,
        name: admins.name,
        email: admins.email,
        createdAt: admins.createdAt,
      });

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "An admin with this email already exists" },
      { status: 409 }
    );
  }
}
