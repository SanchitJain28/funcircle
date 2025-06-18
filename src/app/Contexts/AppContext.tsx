"use client";
import React, { createContext, useState } from "react";

interface AppContextType {
  globalLoading: boolean;
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  order: TicketOrder | null;
  setOrder: React.Dispatch<React.SetStateAction<TicketOrder | null>>;

}

export const appContext = createContext<AppContextType | null>(null);
import { ReactNode } from "react";
import { TicketType } from "../(app)/funcircle/eventTicket/[group_id]/page";

interface AppContextProps {
  children: ReactNode;
}

interface TicketOrder {
  ticket: TicketType;
  quantity: number;
  total: number;
}

export default function AppContext({ children }: AppContextProps) {
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<TicketOrder | null>(null);

  return (
    <appContext.Provider
      value={{
        globalLoading,
        setGlobalLoading,
        order,
        setOrder,

      }}
    >
      {children}
    </appContext.Provider>
  );
}
