"use client";

import { startTransition, useState, useTransition } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Loader } from "lucide-react";
import { AlterStatus, resolver } from "@/schemas/alter-status";
import { ObjectTask } from "@/types/request";
import { put } from "@/lib/request";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

type Status = "Não iniciado" | "Em andamento" | "Concluído";

export function SelectFormAlterStatus({ data }: { data: ObjectTask }) {
  const form = useForm<AlterStatus>({
    resolver: resolver,
    defaultValues: {
      status: data.status,
    },
  });

  const session = useSession();
  const [isPending, startTransition] = useTransition();
  const [selectedStatus, setSelectedStatus] = useState<Status>(
    data.status as Status
  );

  async function onSubmit(dataForm: AlterStatus) {
    startTransition(async () => {
      const { data: response } = await put({
        body: {
          id: data.id,
          title: data.title,
          description: data.description,
          priority: data.priority,
          dueDate: data.dueDate,
          status: dataForm.status,
          userId: Number(session.data?.user.id),
        },
        url: "/api/task",
        pathName: "/task",
      });

      if (response?.status === 200) {
        toast.success("Status alterada com sucesso!");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full  gap-2 hidden max-sm:flex"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormLabel>Situação:</FormLabel>
              <div className="flex gap-2 w-full items-center">
                <Select
                  onValueChange={(value: Status) => {
                    field.onChange(value);
                    setSelectedStatus(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione para alterar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Não iniciado">Não Iniciado</SelectItem>
                    <SelectItem value="Em andamento">Em Andamento</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                  </SelectContent>
                </Select>
                {selectedStatus !== data.status && (
                  <Button
                    disabled={isPending}
                    className="bg-green-500 w-8 h-8 p-0 text-white hover:bg-green-500/80"
                    type="submit"
                  >
                    {isPending ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
