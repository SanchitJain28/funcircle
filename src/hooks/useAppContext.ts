
import { appContext } from "@/app/Contexts/AppContext";
import { useContext } from "react";

export function useAppContext () {
    const AppContext = useContext(appContext)
    if (!AppContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return AppContext
}