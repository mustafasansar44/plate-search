import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

export default function RootIndex() {
    const {session, isAdmin, loading} = useAuth();
    
    if(!loading){
        if(!session) return <Redirect href="/(auth)/login" />
        if(isAdmin) return <Redirect href="/(admin)/(main)" />
        if(session && !isAdmin) return <Redirect href="/(user)/(main)" />
    }

}