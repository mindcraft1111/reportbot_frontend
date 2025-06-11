import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "/assets/logo.png";
import { Link } from "react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import * as apiClient from "../../api/client";
import { buttonBase, gradientBlueButton } from "@/styles/classnames";

const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z
    .string()
    .min(8, "비밀번호는 숫자와 알파벳을 포함한 8자리 이상이어야 합니다."),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchema) {
    const result = await apiClient.login(values);

    if (!result.success) {
      const errorMessage =
        result.error?.message ?? String(result.error) ?? "로그인 실패";
      toast.error(errorMessage);
    } else {
      toast.success("로그인 성공!");
      // Optionally redirect, e.g.:
      // navigate("/dashboard");
    }
  }

  return (
    <div className="bg-[linear-gradient(90deg,_#ffffff_0%,_#e6f1ff_0%,_#fff5f2_61%)]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="/">
            <img src={logo} alt="logo" className="w-40 mb-8 mx-auto block" />
          </a>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-slate-900 text-center text-3xl font-semibold">
              로그인
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-12 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@gmail.com"
                          type="email"
                          className={cn(
                            !form.formState.errors.email &&
                              "focus:outline-solid focus:outline-blue-800 focus:outline-[2px]",
                            "focus-visible:ring-0 focus-visible:border-transparent py-6"
                          )}
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
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          className={cn(
                            !form.formState.errors.password &&
                              "focus:outline-solid focus:outline-blue-800 focus:outline-[2px]",
                            "focus-visible:ring-0 focus-visible:border-transparent py-6"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className={cn(
                    buttonBase,
                    gradientBlueButton,
                    "mt-6 cursor-pointer py-5"
                  )}
                >
                  로그인
                </Button>

                <p className="text-slate-800 text-sm mt-6 text-center">
                  아직 회원이 아니신가요?
                  <Link
                    to="/auth/register"
                    className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                  >
                    회원가입
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
