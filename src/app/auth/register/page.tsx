"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/auth/signin");
    } else {
      const error = await res.json();
      alert(error.error);
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === getValues("password"),
          })}
        />
        {errors.confirmPassword && (
          <p className="error">Passwords do not match</p>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
