"use client";

import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password";
import { Button } from "@/components/ui/button";
import { RegisterFormValues, resolver } from "@/schemas/register-user";
import { signIn } from "next-auth/react";
import { fetcher } from "@/lib/request";
import { RegisterForm } from "@/types/request";

import { useRouter } from "next/navigation";

export default function FormRegister() {
  const form = useForm<RegisterFormValues>({
    resolver,
    defaultValues: {
      password: "",
      email: "",
      name: "",
      confirmPassword: "",
    },
  });
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  function onSubmit(dataForm: RegisterFormValues) {
    startTransition(async () => {
      const { data } = await fetcher<RegisterForm[]>({
        url: "/api/user",
        login: true,
      });
    });
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.getModifierState("CapsLock")) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-96 max-sm:w-11/12 px-4 flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  placeholder="Digite seu nome completo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  placeholder="Digite seu endereço de email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Digite sua senha"
                  id="password"
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete="new-password"
                  onKeyUp={handleKeyUp}
                />
              </FormControl>
              {isCapsLockOn && (
                <FormDescription className="flex gap-1">
                  <p className="text-yellow-500 font-semibold">Atenção:</p> Caps
                  Lock está ativado!
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Digite para confirmar sua senha"
                  id="confirmPassword"
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete="new-password"
                  onKeyUp={handleKeyUp}
                />
              </FormControl>
              {isCapsLockOn && (
                <FormDescription className="flex gap-1">
                  <p className="text-yellow-500 font-semibold">Atenção:</p> Caps
                  Lock está ativado!
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2 justify-center items-center">
          <Button
            type="submit"
            isLoading={isPending}
            className="font-semibold w-full text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-600"
          >
            Registrar
          </Button>
          <Button
            variant={"outline"}
            type={"button"}
            isLoading={isPending}
            onClick={() =>
              startTransition(() => {
                push("/login");
              })
            }
            className="font-semibold w-full"
          >
            Voltar
          </Button>
        </div>
      </form>
    </Form>
  );
}
