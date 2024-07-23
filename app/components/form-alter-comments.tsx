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
import { put } from "@/lib/request";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { ObjectComments } from "@/types/request";

export function CommentsFormAlter({
  dataValue,
  handleCancelEdit,
}: {
  dataValue?: ObjectComments;
  handleCancelEdit: () => void;
}) {
  const [charCount, setCharCount] = useState(dataValue?.comments?.length || 0);
  const [isPending, startTransaction] = useTransition();

  const form = useForm<SchemaComments>({
    resolver,
    defaultValues: {
      comments: dataValue?.comments || "",
    },
  });

  async function onSubmit(data: SchemaComments) {
    startTransaction(async () => {
      const {
        success,
        data: response,
        error,
      } = await put({
        url: `/api/comments/id=`,
        body: {
          comments: data.comments,
        },
        params: {
          id: dataValue?.id,
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
        handleCancelEdit();
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
          <div className=" flex justify-end gap-2">
            <Button
              onClick={handleCancelEdit}
              className="text-white bg-gray-400 hover:bg-gray-400/80"
              type="button"
            >
              Cancelar
            </Button>
            <Button className="text-white" isLoading={isPending} type="submit">
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
