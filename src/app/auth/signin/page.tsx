"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useValidateForm } from "@/hooks/useValidateForm";
import "@/styles/Auth.scss";

function SignInPage() {
  const { register, handleSubmit, watch } = useForm();

  const router = useRouter();
  const [serverError, setServerError] = useState<string | null | undefined>(
    null
  );

  const email = watch("email") || "";
  const password = watch("password") || "";

  const { isFormValid, error } = useValidateForm({ email, password });

  const onSubmit = handleSubmit(async (data) => {
    setServerError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      router.push("/");
      router.refresh();
    } else {
      setServerError(res?.error);
    }
  });

  return (
    <div className="auth-form">
      <h2 className="title">Welcome :3</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {(error || serverError) && (
          <p className="error">{error || serverError}</p>
        )}
        <button
          type="submit"
          disabled={!isFormValid}
          style={{
            opacity: isFormValid ? 1 : 0.5,
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          Sign In
        </button>
      </form>
      <Link href="/auth/register" className="link">
        Register
      </Link>
    </div>
  );
}

export default SignInPage;
