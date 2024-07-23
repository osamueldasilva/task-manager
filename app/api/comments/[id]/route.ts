import { Comment, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });
    if (!comment) {
      return NextResponse.json(
        { error: "Comentário não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar comentário" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log("🚀 ~ PUT ~ id:", id);

    if (!id) {
      return NextResponse.json(
        { error: "ID do comentário é obrigatório" },
        { status: 400 }
      );
    }

    const { comments }: { comments?: string } = await req.json();
    if (!comments) {
      return NextResponse.json(
        { error: "O conteúdo é obrigatório" },
        { status: 400 }
      );
    }

    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { comments },
    });
    return NextResponse.json({
      message: "Comentário aleterado com sucesso",
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar comentário" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    await prisma.comment.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar comentário" },
      { status: 500 }
    );
  }
}
