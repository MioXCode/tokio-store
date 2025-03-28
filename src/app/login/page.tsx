"use client";

import React, { useState } from "react";
import AuthLayout from "@/components/features/auth/auth-layout";
import AuthCard from "@/components/features/auth/auth-card";
import LoginForm from "@/components/features/auth/login-form";
import { AuthFormValues } from "@/interfaces/auth";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

const LoginPage = () => {
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (data: AuthFormValues) => {
    setError(null);
    auth.login(data);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Sign In"
        description="Enter your credentials to access your account"
        footer={
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        }
      >
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}
        <LoginForm onSubmit={handleSubmit} />
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
