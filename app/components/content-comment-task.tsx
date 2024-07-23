"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CommentsForm } from "./form-comments";
import { useState } from "react";
import { ObjectComments } from "@/types/request";
import { CommentsFormAlter } from "./form-alter-comments";

import { Edit } from "lucide-react";

export function ContentCommentTask({
  taskId,
  comments,
}: {
  taskId?: number;
  comments?: ObjectComments[];
}) {
  const [openChange, setOpenChange] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  function handleEditClick(index: number) {
    setEditingIndex(index);
  }

  function handleCancelEdit() {
    setEditingIndex(null);
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
        <section className="flex flex-col gap-2 max-h-60 overflow-auto">
          {comments?.map((value, index) => (
            <div
              key={index}
              className="relative p-2 border rounded-lg bg-gray-300 dark:bg-gray-700 group"
            >
              {editingIndex === index ? (
                <CommentsFormAlter
                  dataValue={value}
                  handleCancelEdit={handleCancelEdit}
                />
              ) : (
                <div className="relative flex flex-col gap-4">
                  <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Edit
                      onClick={() => handleEditClick(index)}
                      className="h-4 w-4 cursor-pointer hover:text-blue-500"
                    />
                  </div>
                  <p className="break-words whitespace-pre-wrap transition-all duration-150 ease-in-out group-hover:mt-4">
                    {value.comments}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </>
  );
}
