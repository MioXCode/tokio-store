"use client";

import React from "react";
import AuthLayout from "@/components/features/auth/auth-layout";
import AuthCard from "@/components/features/auth/auth-card";
import LoginForm from "@/components/features/auth/login-form";
import { AuthFormValues } from "@/interfaces/auth";

const LoginPage = () => {
  const handleSubmit = (data: AuthFormValues) => {
    console.log(data);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Sign In"
        description="Enter your credentials to access your account"
        footer={
          <p className="text-center text-sm text-gray-100">
            © 2023 Your Company. All rights reserved.
          </p>
        }
      >
        <LoginForm onSubmit={handleSubmit} />
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
