import prisma from "@/lib/prisma";
import { Task } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const task = await prisma.task.findMany();

  return NextResponse.json({ task });
}

export async function POST(req: NextRequest) {
  try {
    const { description, dueDate, priority, status, title }: Task =
      await req.json();

    if (!description || !dueDate || !priority || !status || !title) {
      return NextResponse.json(
        { message: "Esta faltando informação no body. Por favor, verifique." },
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

    const task = await prisma.task.create({
      data: {
        description,
        dueDate,
        priority,
        status,
        title,
      },
    });

    return NextResponse.json({ message: "Tarefa criada com sucesso!", task });
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
  const { id } = await req.json();

  try {
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "Tarefa deletada com sucesso!", task });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao deletar" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, description, dueDate, priority, status, title }: Task =
      await req.json();

    if (!id || !description || !dueDate || !priority || !status || !title) {
      return NextResponse.json(
        { message: "Esta faltando informação no body. Por favor, verifique." },
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

    const task = await prisma.task.update({
      where: { id },
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
      task,
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
