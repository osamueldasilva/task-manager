import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Task } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    if (!userId) {
      return NextResponse.json({ message: "Não autorizado", status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: { userId: parseInt(userId, 10) },
    });

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("🚀 ~ GET ~ error:", error);
    return NextResponse.json({
      message: "Erro ao buscar tarefas",
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { description, dueDate, priority, title, userId }: Task =
      await req.json();

    if (!description || !dueDate || !priority || !title || !userId) {
      return NextResponse.json(
        { message: "Está faltando informação no body. Por favor, verifique." },
        { status: 400 }
      );
    }

    const validPriorities = ["Alta", "Média", "Baixa"];

    if (!validPriorities.includes(priority)) {
      return NextResponse.json(
        {
          message: "O campo PRIORITY tem que ser igual a Alta, Média ou Baixa.",
        },
        { status: 400 }
      );
    }

    await prisma.task.create({
      data: {
        description,
        dueDate,
        priority,
        status: "Não iniciado",
        title,
        userId,
      },
    });

    return NextResponse.json({
      message: "Tarefa criada com sucesso!",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Ocorreu um erro ao criar a tarefa. Por favor, tente novamente mais tarde.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id, userId } = await req.json();
  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const task = await prisma.task.deleteMany({
      where: {
        id,
        userId,
      },
    });
    return NextResponse.json({
      message: "Tarefa deletada com sucesso!",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao deletar" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, description, dueDate, priority, status, title, userId }: Task =
      await req.json();

    if (
      !id ||
      !description ||
      !dueDate ||
      !priority ||
      !status ||
      !title ||
      !userId
    ) {
      return NextResponse.json(
        { message: "Está faltando informação no body. Por favor, verifique." },
        { status: 400 }
      );
    }

    const validPriorities = ["Alta", "Média", "Baixa"];
    const validStatuses = ["Não iniciado", "Em andamento", "Concluído"];

    if (!validPriorities.includes(priority)) {
      return NextResponse.json(
        {
          message: "O campo PRIORITY tem que ser igual a Alta, Média ou Baixa.",
        },
        { status: 400 }
      );
    }

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          message:
            "O campo STATUS tem que ser igual a Não iniciado, Em andamento ou Concluído.",
        },
        { status: 400 }
      );
    }

    await prisma.task.updateMany({
      where: { id, userId },
      data: {
        description,
        dueDate,
        priority,
        status,
        title,
      },
    });

    return NextResponse.json({
      message: "Tarefa atualizada com sucesso!",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Ocorreu um erro ao atualizar a tarefa. Por favor, tente novamente mais tarde.",
      },
      { status: 500 }
    );
  }
}
