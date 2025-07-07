"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import type * as React from "react";
import { getQueryClient } from "./get-query-client";

// localStorage adapter for web
const localStorageAdapter = {
  getItem: (key: string): Promise<string | null> => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string): Promise<void> => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  const [persister] = useState(() => {
    if (typeof window !== "undefined") {
      return createAsyncStoragePersister({
        storage: localStorageAdapter,
        key: "USER_DATA_CACHE",
        serialize: (data) => {
          // Only persist queries that contain 'user' in the queryKey
          const filteredData = {
            ...data,
            clientState: {
              ...data.clientState,
              queries: data.clientState.queries.filter(
                (query) => query.queryKey.includes("user") // Adjust this condition as needed
              ),
            },
          };
          return JSON.stringify(filteredData);
        },
        deserialize: (data) => {
          return JSON.parse(data);
        },
      });
    }
    return undefined;
  });

  // Server-side rendering - don't persist
  if (typeof window === "undefined") {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: persister!,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
      }}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
