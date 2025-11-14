"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../Input";
import SubmitButton from "../SubmitButton";
import { useState } from "react";

const loginSchema = z.object({
  login: z.string().min(3, "Login must be at least 3 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Login() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) setSuccessMessage("Login successful!");
      else {
        const result = await response.json();
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col liquid-glass p-8 sm:p-10 md:p-12 rounded-4xl sm:rounded-[3rem] md:rounded-[3.5rem] shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl gap-6 z-10 transition-all duration-300 ease-in-out"
      >
        <Input
          id="login"
          label="Login"
          type="text"
          {...register("login")}
          error={errors.login?.message}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <SubmitButton
          disabled={
            isSubmitting ||
            Object.keys(errors).length > 0 ||
            errorMessage !== ""
          }
          label="Sign In"
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      </form>
    </div>
  );
}