import { useEffect } from "react";
import { AuthStore } from "../state/AuthStore";

export function LoginResetError({ formData }: LoginResetErrorProps) {
  const setError = AuthStore((state) => state.setError);
  useEffect(() => {
    if (formData.email || formData.password || formData.username) {
      setError("");
    }
  }, [formData.email, formData.password, formData.username, setError]);
}

export function SignUpResetError({ formData }: SignUpResetErrorProps) {
  const setError = AuthStore((state) => state.setError);
  useEffect(() => {
    if (
      formData.email ||
      formData.password ||
      formData.username ||
      formData.age ||
      formData.bdate ||
      formData.firstname ||
      formData.lastname
    ) {
      setError("");
    }
  }, [
    formData.age,
    formData.bdate,
    formData.email,
    formData.firstname,
    formData.lastname,
    formData.password,
    formData.username,
    setError,
  ]);
}
