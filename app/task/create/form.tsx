"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CreateTasks, resolver } from "@/schemas/task";
import { useTransition } from "react";
import { poster } from "@/lib/request";
import { useRouter } from "next/navigation";
import ButtonSave from "@/app/components/button-save";
import { signOut, useSession } from "next-auth/react";

export function FormCreateTask() {
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();
  const session = useSession();
  const form = useForm<CreateTasks>({
    resolver,
    defaultValues: {
      title: "",
      description: "",
      priority: "",
    },
  });

  function onSubmit(data: CreateTasks) {
    startTransition(async () => {
      const formattedDate = format(data.dataConclusion, "dd/MM/yyyy", {
        locale: ptBR,
      });

      const body = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: formattedDate,
        userId: Number(session.data?.user?.id),
      };

      const { data: response, error } = await poster({
        body,
        url: "/api/task",
        pathName: "/task",
      });

      if (error?.status === 401) {
        toast.success(error.message);
        signOut({ callbackUrl: "/login" });
      }

      if (response?.status === 200) {
        toast.success(response.message);
        push("/task");
      }
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-3/4 max-sm:w-11/12 px-4 flex flex-col gap-2"
      >
        <div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    placeholder="Escreva o título"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    className="max-h-32"
                    placeholder="Escreva a descrição"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dataConclusion"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data para conclusão</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        <span>Data para conclusão</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date.getTime() < new Date().setHours(0, 0, 0, 0)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonSave
          isLoading={isPending}
          action="add"
          fn={form.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}
