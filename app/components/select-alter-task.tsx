"use client";

import { useState } from "react";
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
import { Check } from "lucide-react";
import { AlterStatus, resolver } from "@/schemas/alter-status";
import { ObjectTask } from "@/types/request";

type Status = "Não iniciado" | "Em andamento" | "Concluído";

export function SelectFormAlterStatus({ data }: { data: ObjectTask }) {
  const form = useForm<AlterStatus>({
    resolver: resolver,
    defaultValues: {
      status: data.status,
    },
  });

  const [selectedStatus, setSelectedStatus] = useState<Status>(
    data.status as Status
  );

  function onSubmit(data: AlterStatus) {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex gap-2"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormLabel>Situação:</FormLabel>
              <div className="flex gap-2 w-full">
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
                    className="bg-green-500 text-white hover:bg-green-500/80"
                    type="submit"
                    size={"icon"}
                  >
                    <Check className="w-5 h-5" />
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
