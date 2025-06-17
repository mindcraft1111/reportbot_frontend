import { buttonBase, gradientBlueButton } from "@/styles/classnames";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { Link, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import * as apiClient from "../api/client";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z
    .string()
    .min(8, "비밀번호는 숫자와 알파벳을 포함한 8자리 이상이어야 합니다."),
  user_name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다."),
  phone: z.string().regex(/^\d{11}$/, "전화번호는 숫자 11자리여야 합니다."),
  company: z.string().min(2, "회사명은 최소 2자 이상이어야 합니다."),
  position: z.string().min(2, "직책은 최소 2자 이상이어야 합니다."),
});

export type RegisterSchema = z.infer<typeof formSchema>;

export default function Register() {
  const navigator = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      user_name: "",
      phone: "",
      company: "",
      position: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("회원가입 데이터", values);

    const result = await apiClient.register(values);

    if (!result.success && result.error) {
      Object.entries(result.error).forEach(([_, message]) => {
        if (message) {
          toast.error(String(message));
        }
      });
    }
    toast.success("🎉 회원가입에 성공하셨습니다.");
    navigator("/auth/login/");
  }

  return (
    <div className="bg-[linear-gradient(90deg,_#ffffff_0%,_#e6f1ff_0%,_#fff5f2_61%)]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-40 mb-8 mx-auto block" />
          </Link>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-slate-900 text-center text-3xl font-semibold">
              회원가입
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
                          {...field}
                          className={cn(
                            !form.formState.errors.password &&
                              "focus:outline-solid focus:outline-blue-800 focus:outline-[2px]",
                            "focus-visible:ring-0 focus-visible:border-transparent py-6"
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="user_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="홍길동"
                          type="text"
                          className={cn(
                            !form.formState.errors.user_name &&
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="01012345678"
                          type="text"
                          className={cn(
                            !form.formState.errors.phone &&
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
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>회사</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(주)베스트"
                          type="text"
                          className={cn(
                            !form.formState.errors.company &&
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
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>직책</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="과장"
                          type="text"
                          className={cn(
                            !form.formState.errors.position &&
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
                  회원가입
                </Button>

                <p className="text-slate-800 text-sm mt-6 text-center">
                  이미 회원이신가요?
                  <Link
                    to="/auth/login"
                    className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                  >
                    로그인
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
