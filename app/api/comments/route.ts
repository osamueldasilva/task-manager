import { Comment, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextApiResponse) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "Não autorizado", status: 401 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { task: { userId: Number(userId) } },
    });

    return NextResponse.json({ comments });
  } catch (error) {
    return NextResponse.json({
      message: "Erro ao buscar comentários",
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { taskId, comments }: { taskId: number; comments: string } =
      await req.json();

    if (!taskId || !comments) {
      return NextResponse.json({
        message: "ID da tarefa e comentários são obrigatórios",
        status: 400,
      });
    }

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      return NextResponse.json({
        message: "Tarefa não encontrada",
        status: 404,
      });
    }

    await prisma.comment.create({
      data: {
        comments,
        taskId: task.id,
      },
    });

    return NextResponse.json({
      message: "Comentário adicionado com sucesso",
      status: 204,
    });
  } catch (error) {
    console.error("Erro detalhado:", error);
    return NextResponse.json({
      message:
        "Ocorreu um erro ao adicionar o comentário. Por favor, tente novamente mais tarde.",
    });
  }
}

export async function PUT(req: NextRequest) {
  const { id, comments, taskId, createdAt, updatedAt }: Comment =
    await req.json();

  try {
    await prisma.comment.updateMany({
      where: { id, taskId },
      data: {
        comments,
        createdAt,
        updatedAt,
      },
    });

    return NextResponse.json({
      message: "Comentario atualizada com sucesso!",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Ocorreu um erro ao atualizar o comentario. Por favor, tente novamente mais tarde.",
      },
      { status: 500 }
    );
  }
}
