"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CommentsForm } from "./form-comments";
import { useState, useTransition } from "react";
import { ObjectComments } from "@/types/request";
import { CommentsFormAlter } from "./form-alter-comments";

import { Edit, EllipsisVertical, Trash } from "lucide-react";
import { DropdownMenuOptions } from "./dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { deleter } from "@/lib/request";

export function ContentCommentTask({
  taskId,
  comments,
}: {
  taskId?: number;
  comments?: ObjectComments[];
}) {
  const [openChange, setOpenChange] = useState("");
  const [isPending, startTransaction] = useTransition();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  function handleEditClick(index: number) {
    setEditingIndex(index);
  }

  function handleCancelEdit() {
    setEditingIndex(null);
  }

  function handleDeleteComment(id: number) {
    startTransaction(async () => {
      const {
        success,
        data: response,
        error,
      } = await deleter({
        url: "/api/comments",
        body: {
          id,
        },
        pathName: "",
      });

      if (error?.status === 401) {
        toast.success(error.message);
        signOut({ callbackUrl: "/login" });

        return;
      }

      if (response?.status === 200) {
        toast.success(response.message);
        return;
      }
    });
  }

  return (
    <>
      <Accordion
        type="single"
        collapsible
        asChild
        onValueChange={(e) => setOpenChange(e)}
        className="mb-2"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Adicionar Comentário</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 px-1 mt-1">
            <CommentsForm taskId={taskId} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {!openChange && (
        <ScrollArea className=" max-h-60">
          <div className="flex gap-2 flex-col mb-2">
            {comments?.map((value, index) => (
              <div
                key={index}
                className="relative p-2 border rounded-lg bg-gray-300 dark:bg-gray-700 group"
              >
                <div className="w-full flex justify-end">
                  <DropdownMenuOptions>
                    <div className="flex flex-col gap-1">
                      <DropdownMenuItem
                        onClick={() => handleEditClick(index)}
                        className="w-full text-white flex gap-2 bg-gray-500 hover:bg-gray-500/80"
                      >
                        <Edit className="h-4 w-4 cursor-pointer" />
                        <p>Alterar</p>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteComment(value.id)}
                        className="w-full flex gap-2 text-white bg-red-500 hover:bg-red-500/80 "
                      >
                        <Trash className="h-4 w-4 cursor-pointer" />
                        <p>Deletar</p>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuOptions>
                </div>
                {editingIndex === index ? (
                  <CommentsFormAlter
                    dataValue={value}
                    handleCancelEdit={handleCancelEdit}
                  />
                ) : (
                  <div className="flex flex-col gap-1">
                    <p className="">{value.comments}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );
}
