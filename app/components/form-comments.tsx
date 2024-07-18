"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { SchemaComments, resolver } from "@/schemas/comments";
import { poster } from "@/lib/request";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export function CommentsForm({
  taskId,
  onCommentSaved,
}: {
  taskId: number;
  onCommentSaved: () => void;
}) {
  const [charCount, setCharCount] = useState(0);
  const [isPending, startTransaction] = useTransition();

  const form = useForm<SchemaComments>({
    resolver,
    defaultValues: {
      comments: "",
    },
  });

  async function onSubmit(data: SchemaComments) {
    startTransaction(async () => {
      const {
        success,
        data: response,
        error,
      } = await poster({
        url: "/api/comments",
        body: {
          taskId,
          comments: data.comments,
        },
        pathName: "",
      });

      if (error?.status === 401) {
        toast.success(error.message);
        signOut({ callbackUrl: "/login" });

        return;
      }

      if (response?.status === 204) {
        toast.success(response.message);
        form.reset({ comments: "" });
        onCommentSaved();
        return;
      }
    });
  }

  function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const valueLength = event.target.value.length;

    setCharCount(valueLength);

    if (valueLength >= 200) {
      form.setError("comments", {
        message: "O comentário não pode ter mais de 200 caracteres.",
      });
    } else {
      form.clearErrors("comments");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentário</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escreva seu comentário"
                  className="max-h-20"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleTextareaChange(e);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-col justify-end">
          <div className="w-full flex justify-end">
            <span>{charCount}/200 caracteres</span>
          </div>
          <Button className="text-white" isLoading={isPending} type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
