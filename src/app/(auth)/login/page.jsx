"use client";
import { useAuthStore } from "@/store/auth";
import React from "react";

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    // always prvenet default while handling the form
    e.preventDefault();

    // collect data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // validation
    if (!email || !password) {
      setError(() => "Please fill all the states");
      return;
    }
    // handle loafing and error
    setIsLoading(() => true);
    setError(() => "");

    // login from store
    const loginResponse = await login(email.toString(), password.toString());
    // handle response
    if (loginResponse.error) {
      setError(() => loginResponse.error.message);
    }
    setIsLoading(() => false);
  };
  const { login } = useAuthStore();

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        <input type="email" name="" id="email" placeholder="email" />
        <input type="password" name="" id="email" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
