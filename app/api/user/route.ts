import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../db/db";
import { RegisterForm } from "@/types/request";

// MELHORAR TODO ESSE CODIGO

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany();

  return NextResponse.json({ message: "FUNCIONOU", users });
}

export async function POST(req: NextRequest) {
  const { email, username, name, password }: RegisterForm = await req.json();

  if (!email || !password || !username || !name) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        username,
        name,
      },
    });

    return NextResponse.json({ message: "User created successfully", user });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error: error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ message: "User deleted successfully", user });
}
