import React from "react";
import ErrorBoundary from "@/components/organisms/errorBoundary";
import { cn } from "@/lib/utils";

export interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  background?: "default" | "gradient" | "minimal";
}

const backgroundClasses = {
  default: "bg-white dark:bg-gray-900",
  gradient:
    "bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
  minimal: "bg-gray-50 dark:bg-gray-800",
};

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  background = "gradient",
}) => {
  return (
    <div
      className={cn("min-h-screen", backgroundClasses[background], className)}
    >
      <ErrorBoundary>
        <main className={cn("container mx-auto p-6")}>{children}</main>
      </ErrorBoundary>
    </div>
  );
};
