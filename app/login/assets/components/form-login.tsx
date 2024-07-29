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
import { LoginFormValues, resolver } from "@/schemas/login";
import { signIn } from "next-auth/react";
import { fetcher } from "@/lib/request";
import { RegisterForm } from "@/types/request";
import bcryptjs from "bcryptjs";
import { toast } from "sonner";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const form = useForm<LoginFormValues>({
    resolver,
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [isPendingLogin, startTransitionLogin] = useTransition();
  const [isPendingRegister, startTransitionRegister] = useTransition();
  const { push } = useRouter();

  function onSubmit(dataForm: LoginFormValues) {
    startTransitionLogin(async () => {
      const { data } = await fetcher<RegisterForm[]>({
        url: "/api/user",
        login: true,
      });
      const getInfosUser = data.find((vl) => vl.email === dataForm.email);

      if (!getInfosUser) {
        form.setError("email", {
          message:
            "Email não encontrado. Por favor, verifique e tente novamente.",
        });
        toast.error(
          "Email não encontrado. Por favor, verifique e tente novamente."
        );
        return;
      }

      if (getInfosUser?.password && dataForm?.password) {
        const verifyCript = await bcryptjs.compare(
          dataForm.password,
          getInfosUser.password
        );

        if (verifyCript) {
          signIn("credentials", { ...dataForm, callbackUrl: "/task" });
          toast.success("Usuário logado com sucesso!");
        } else {
          form.setError("password", {
            message: "Senha incorreta. Por favor, tente novamente.",
          });
          toast.error("Senha incorreta. Por favor, tente novamente.");
        }
      }
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
        className="w-96 max-md:w-11/12 px-4 flex flex-col gap-2"
      >
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

        <div className="flex flex-col gap-2 justify-center items-center">
          <Button
            type="submit"
            isLoading={isPendingLogin}
            className="font-semibold w-full text-white bg-blue-700 hover:bg-blue-700/80 focus:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-500/80 dark:focus:bg-blue-600"
          >
            Login
          </Button>
          <Button
            variant={"outline"}
            type={"button"}
            isLoading={isPendingRegister}
            onClick={() =>
              startTransitionRegister(() => {
                push("/register");
              })
            }
            className="font-semibold w-full"
          >
            Criar Conta
          </Button>
        </div>
      </form>
    </Form>
  );
}
