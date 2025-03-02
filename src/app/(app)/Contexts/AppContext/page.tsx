"use client"
import React, { createContext, useState } from 'react'

interface AppContextType {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const appContext = createContext<AppContextType | null>(null);
import { ReactNode } from 'react';

interface AppContextProps {
    children: ReactNode;
}

export default function AppContext({ children }: AppContextProps) {
    const [loading,setLoading]=useState<boolean>(false)
  return (
    <appContext.Provider value={{loading,setLoading}}>
        {children}
    </appContext.Provider>  
  )
}
