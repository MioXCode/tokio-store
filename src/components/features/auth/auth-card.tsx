"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const AuthCard = ({ title, description, footer, children }: AuthCardProps) => {
  return (
    <Card className="w-full max-w-md backdrop-blur-md bg-white/20 border border-white/30 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
        {description && (
          <CardDescription className="text-gray-100">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>{children}</CardContent>

      {footer && (
        <CardFooter className="flex flex-col gap-4">{footer}</CardFooter>
      )}
    </Card>
  );
};

export default AuthCard;
