"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useValidateAuth } from "@/hooks/useValidateAuth";
import { useValidateSettings } from "@/hooks/useValidateSettings";
import FormContainer from "@/components/FormContainer";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [initialUsername, setInitialUsername] = useState("");

  useEffect(() => {
    if (session?.user) {
      const userEmail = session.user.email || "";
      const userUsername = session.user.username || "";
      setEmail(userEmail);
      setUsername(userUsername);
      setInitialEmail(userEmail);
      setInitialUsername(userUsername);
    }
  }, [session]);

  const hasOtherChanges =
    email !== initialEmail || username !== initialUsername;

  const { isFormValid, error, validateForm } = useValidateAuth({
    email,
    username,
    password: newPassword,
    confirmPassword: newPassword,
  });

  const { isSubmitEnabled } = useValidateSettings({
    currentPassword,
    newPassword,
    isFormValid,
    hasOtherChanges,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && !validateForm()) return;

    try {
      const res = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          currentPassword,
          newPassword: newPassword || undefined,
        }),
      });

      if (res.ok) router.push("/dashboard");
      else throw new Error((await res.json()).error || "Update failed");
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    }
  };

  if (status === "loading")
    return (
      <FormContainer title="Account Settings">
        <p className="loading">Loading session...</p>
      </FormContainer>
    );

  return (
    <FormContainer title="Account Settings">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="New Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={!isSubmitEnabled}>
          Save Changes
        </button>
      </form>
    </FormContainer>
  );
}
