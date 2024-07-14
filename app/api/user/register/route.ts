// app/api/auth/register.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  console.log("🚀 ~ POST ~ password:", password);
  console.log("🚀 ~ POST ~ email:", email);
  console.log("🚀 ~ POST ~ name:", name);

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
  }
}
