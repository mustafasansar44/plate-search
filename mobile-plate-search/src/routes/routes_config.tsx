import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Colors from "@/constants/Colors";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={20} style={{ marginBottom: -3 }
    } {...props} />;
}

export const colorScheme = useColorScheme();

export const tabScreenOptions = {
    tabBarActiveTintColor: Colors['light'].tint,  // Colors[useColorScheme ?? 'light'].tint,
    headerShown: useClientOnlyValue(false, true),
};


export const userScreenOptions = {
    name: "(user)",
    title: 'Anasayfa',
    headerShown: false,
    tabBarIcon: ({ color }: { color: string }) => {
        <TabBarIcon name="dashboard" color={color} />
    }
};

export const profileScreenOptions = {
    name: "(profile)",
    title: 'Profile',
    headerShown: false,
    tabBarIcon: ({ color }: { color: string }) => <AntDesign name="profile" size={24} color={color} />,
};

export const notFoundScreenOptions = {
    name: "+not-found",
    href: null
};