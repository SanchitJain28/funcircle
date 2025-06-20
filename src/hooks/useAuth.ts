import { AuthContext } from "@/app/Contexts/AuthContext";
import { useContext } from "react";

// const supabase = createClient( )

export function useAuth(){
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context
}


// const IsSupabaseUserLevelSet = async () => {
//     try {
//       const { data } = await supabase
//         .from("users")
//         .select("usersetlevel")
//         .eq("user_id", user?.uid)
//         .single();
//       if (!data?.usersetlevel) setRedirectionToAssignLevel(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

// export function useIsLevelSet(){

// }