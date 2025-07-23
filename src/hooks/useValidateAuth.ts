import { useState, useEffect, useMemo } from "react";

interface FormValues {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
}

interface ValidationResult {
  isFormValid: boolean;
  error: string;
  validateForm: () => boolean;
}

export function useValidateAuth(formValues: FormValues): ValidationResult {
  const { email, password, username, confirmPassword } = formValues;
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState("");

  // Auto-detect form type based on provided values
  const isRegisterForm = useMemo(() => {
    return Boolean(username !== undefined || confirmPassword !== undefined);
  }, [username, confirmPassword]);

  // Email validation regex - memoized to prevent unnecessary re-renders
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  // Validate form on any input change
  useEffect(() => {
    // Basic validations for all forms
    const isEmailValid =
      email?.trim() !== "" && email ? emailRegex.test(email) : false;
    const isPasswordValid = password?.length >= 6;

    let formValid = isEmailValid && isPasswordValid;

    // Additional validations for register form
    if (isRegisterForm) {
      const isUsernameValid =
        username?.trim() !== "" && username
          ? username.trim().length >= 3
          : false;

      // For register form, confirmPassword must not be empty AND must match password
      const doPasswordsMatch =
        confirmPassword !== "" && password === confirmPassword;

      // Clear "Passwords do not match" error when passwords finally match
      if (error === "Passwords do not match" && doPasswordsMatch) {
        setError("");
      }
      // Set specific error message for password mismatch
      else if (confirmPassword && password !== confirmPassword) {
        setError("Passwords do not match");
      }
      // Clear other errors when typing
      else if (error && error !== "Passwords do not match") {
        setError("");
      }

      // In register form, username and confirmPassword are required
      formValid = formValid && isUsernameValid && doPasswordsMatch;
    } else {
      // For sign-in form, reset error when typing
      if (error) {
        setError("");
      }
    }

    setIsFormValid(formValid);
  }, [
    email,
    password,
    username,
    confirmPassword,
    error,
    emailRegex,
    isRegisterForm,
  ]);

  const validateForm = (): boolean => {
    // Basic validation for all forms
    if (!email || !password) {
      setError("All fields are required");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    // Additional validation for register form
    if (isRegisterForm) {
      if (!username) {
        setError("Username is required");
        return false;
      }

      if (username.trim().length < 3) {
        setError("Username must be at least 3 characters");
        return false;
      }

      if (!confirmPassword) {
        setError("Please confirm your password");
        return false;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    }

    return true;
  };

  return { isFormValid, error, validateForm };
}
