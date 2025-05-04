"use client";
import React, { createContext, useState } from "react";

interface AppContextType {
  globalLoading: boolean;
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const appContext = createContext<AppContextType | null>(null);
import { ReactNode } from "react";

interface AppContextProps {
  children: ReactNode;
}

export default function AppContext({ children }: AppContextProps) {
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);
  return (
    <appContext.Provider value={{ globalLoading, setGlobalLoading }}>
      {children}
    </appContext.Provider>
  );
}
