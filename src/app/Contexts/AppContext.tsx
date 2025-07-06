"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { TicketType } from "../types";

// ===== Interfaces ===== //
interface TicketOrder {
  ticket: TicketType;
  quantity: number;
  total: number;
}

interface SubscriptionModel {
  title: string;
  price: number;
  billing: string;
  popular: boolean;
  features: string[];
}

interface SubscriptionOrder {
  id: number;
  created_at: string;
  venue_name: string;
  image: string;
  maps_link: string;
  description: string;
  location: string;
  subscription_model: SubscriptionModel;
}

interface AppContextType {
  globalLoading: boolean;
  setGlobalLoading: Dispatch<SetStateAction<boolean>>;
  order: TicketOrder | null;
  setOrder: Dispatch<SetStateAction<TicketOrder | null>>;
  subscription: SubscriptionOrder | null;
  setSubscription: Dispatch<SetStateAction<SubscriptionOrder | null>>;
}

interface AppContextProps {
  children: ReactNode;
}

// ===== Context ===== //
export const appContext = createContext<AppContextType | null>(null);

// ===== Provider Component ===== //
export default function AppContextProvider({ children }: AppContextProps) {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [order, setOrder] = useState<TicketOrder | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionOrder | null>(
    null
  );

  return (
    <appContext.Provider
      value={{
        globalLoading,
        setGlobalLoading,
        order,
        setOrder,
        subscription,
        setSubscription,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

// ===== Custom Hook ===== //
export function useAppContext() {
  const context = useContext(appContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
