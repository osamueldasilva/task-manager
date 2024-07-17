"use client";

import { useForm } from "react-hook-form";
import { useState } from "react"; // Importe o useState para gerenciar o estado da contagem

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { SchemaComments, resolver } from "@/schemas/comments";

export function CommentsForm() {
  const [charCount, setCharCount] = useState(0);

  const form = useForm<SchemaComments>({
    resolver,
    defaultValues: {
      comments: "",
    },
  });

  function onSubmit(data: SchemaComments) {}

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
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  );
}
