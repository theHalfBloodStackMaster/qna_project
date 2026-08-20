"use client";
import { useAuthStore } from "@/store/auth";
import React from "react";

function Signup() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { creatAccount, login } = useAuthStore;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // collect data
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstname");
    const lastName = formData.get("lastame");
    const email = formData.get("email");
    const password = formData.get("password");
    // validate
    if (!firstName || !lastName || !email || !password) {
      setError(() => "Please fill out all the fields");
      return;
    }
    // call the store
    setIsLoading(true);
    setError("");

    // create account
    const response = await creatAccount(
      `${firstName} ${lastName}`,
      email?.toString(),
      password?.toString(),
    );

    if (response.error) {
      setError(() => response.error.message);
    } else {
      const loginResponse = await login(email.toString(), password.toString());

      if (loginResponse.error) {
        setError(() => loginResponse.error.message);
      }
    }
    setIsLoading(() => false);
  };

  return (
    <div>
      Signup
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="first name" />
        <input type="text" placeholder="last name" />
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
      </form>
    </div>
  );
}

export default Signup;
