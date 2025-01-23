import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function tabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={20} style={{ marginBottom: -3 }
    } {...props} />;
}

export function getColorScheme() {
    return useColorScheme() ?? 'light';
}
