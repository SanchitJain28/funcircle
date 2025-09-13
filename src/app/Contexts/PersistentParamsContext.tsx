// 1. Create a context to manage persistent query params
// contexts/PersistentParamsContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface PersistentParamsContextType {
  params: Record<string, string>;
  addParam: (key: string, value: string) => void;
  removeParam: (key: string) => void;
  clearParams: () => void;
}

const PersistentParamsContext = createContext<
  PersistentParamsContextType | undefined
>(undefined);

export function PersistentParamsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [persistentParams, setPersistentParams] = useState<
    Record<string, string>
  >({});
  const searchParams = useSearchParams();
  //   const pathname = usePathname();
  //   const router = useRouter();

  const PERSISTENT_PARAMS = [
    "headhide",
    "theme",
    "lang",
    "lat",
    "lng",
    "hidelocbtn",
  ];

  useEffect(() => {
    // Extract persistent params from current URL
    const currentParams: Record<string, string> = {};

    PERSISTENT_PARAMS.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        currentParams[param] = value;
      }
    });

    // Update state if we found new persistent params
    if (Object.keys(currentParams).length > 0) {
      setPersistentParams((prev) => ({ ...prev, ...currentParams }));
    }
  }, [searchParams]);

  const addParam = (key: string, value: string) => {
    setPersistentParams((prev) => ({ ...prev, [key]: value }));
  };

  const removeParam = (key: string) => {
    setPersistentParams((prev) => {
      const newParams = { ...prev };
      delete newParams[key];
      return newParams;
    });
  };

  const clearParams = () => {
    setPersistentParams({});
  };

  return (
    <PersistentParamsContext.Provider
      value={{
        params: persistentParams,
        addParam,
        removeParam,
        clearParams,
      }}
    >
      {children}
    </PersistentParamsContext.Provider>
  );
}

export function usePersistentParams() {
  const context = useContext(PersistentParamsContext);
  if (!context) {
    throw new Error(
      "usePersistentParams must be used within a PersistentParamsProvider"
    );
  }
  return context;
}
