"use client";

import { ThemeProvider } from "next-themes";
import React, { FC } from "react";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "./ui/toast";
import { Toaster } from "./ui/toaster";



interface ProvidersProps {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </SessionProvider>
    </ThemeProvider>
  )
};

export default Providers;