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

export function ContentCommentTask({
  taskId,
  comments,
}: {
  taskId: number;
  comments: ObjectComments[];
}) {
  const [openChange, setOpenChange] = useState("");

  const handleCommentSaved = () => {
    setOpenChange("");
  };

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
            <CommentsForm taskId={taskId} onCommentSaved={handleCommentSaved} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {!openChange && (
        <section className="flex flex-col gap-2 max-h-60 overflow-auto">
          {comments.map((value, index) => (
            <div
              key={index}
              className="p-2 border rounded-lg bg-gray-300 dark:bg-gray-700"
            >
              {value.comments}
            </div>
          ))}
        </section>
      )}
    </>
  );
}
