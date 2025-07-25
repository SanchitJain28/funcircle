"use client";

import { CustomAlert } from "@/components/alert/Alert";
import React, { createContext, useContext, useState, useCallback } from "react";

type AlertVariant = "success" | "warning" | "danger" | "info" | "default";

interface AlertData {
  id: string;
  variant: AlertVariant;
  title: string;
  message: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

interface AlertContextType {
  showAlert: (alert: Omit<AlertData, "id">) => void;
  showSuccess: (
    title: string,
    message: string,
    options?: { autoClose?: boolean; autoCloseDelay?: number }
  ) => void;
  showWarning: (
    title: string,
    message: string,
    options?: { autoClose?: boolean; autoCloseDelay?: number }
  ) => void;
  showDanger: (
    title: string,
    message: string,
    options?: { autoClose?: boolean; autoCloseDelay?: number }
  ) => void;
  showInfo: (
    title: string,
    message: string,
    options?: { autoClose?: boolean; autoCloseDelay?: number }
  ) => void;
  hideAlert: (id: string) => void;
  hideAllAlerts: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: React.ReactNode;
  maxAlerts?: number;
}

export function AlertProvider({ children, maxAlerts = 3 }: AlertProviderProps) {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  const generateId = useCallback(() => {
    return `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const showAlert = useCallback(
    (alertData: Omit<AlertData, "id">) => {
      const id = generateId();
      const newAlert: AlertData = {
        ...alertData,
        id,
        autoClose: alertData.autoClose ?? true,
        autoCloseDelay: alertData.autoCloseDelay ?? 3000,
      };

      setAlerts((prev) => {
        const updated = [newAlert, ...prev];
        // Limit the number of alerts shown at once
        return updated.slice(0, maxAlerts);
      });
    },
    [generateId, maxAlerts]
  );

  const showSuccess = useCallback(
    (
      title: string,
      message: string,
      options?: { autoClose?: boolean; autoCloseDelay?: number }
    ) => {
      showAlert({
        variant: "success",
        title,
        message,
        ...options,
      });
    },
    [showAlert]
  );

  const showWarning = useCallback(
    (
      title: string,
      message: string,
      options?: { autoClose?: boolean; autoCloseDelay?: number }
    ) => {
      showAlert({
        variant: "warning",
        title,
        message,
        ...options,
      });
    },
    [showAlert]
  );

  const showDanger = useCallback(
    (
      title: string,
      message: string,
      options?: { autoClose?: boolean; autoCloseDelay?: number }
    ) => {
      showAlert({
        variant: "danger",
        title,
        message,
        ...options,
      });
    },
    [showAlert]
  );

  const showInfo = useCallback(
    (
      title: string,
      message: string,
      options?: { autoClose?: boolean; autoCloseDelay?: number }
    ) => {
      showAlert({
        variant: "info",
        title,
        message,
        ...options,
      });
    },
    [showAlert]
  );

  const hideAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const hideAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const value: AlertContextType = {
    showAlert,
    showSuccess,
    showWarning,
    showDanger,
    showInfo,
    hideAlert,
    hideAllAlerts,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}

      {/* Alert Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {alerts.map((alert) => (
          <CustomAlert
            key={alert.id}
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
            isVisible={true}
            onClose={() => hideAlert(alert.id)}
            autoClose={alert.autoClose}
            autoCloseDelay={alert.autoCloseDelay}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
}

// Custom Hook
export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
