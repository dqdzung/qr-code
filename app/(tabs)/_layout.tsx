import { Tabs } from "expo-router";
import icons from "~/lib/icons";

export default function TabLayout() {
	return (
		<Tabs screenOptions={{}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Reader",
					headerShown: false,
					tabBarIcon: () => <icons.Scan className="text-foreground" />,
				}}
			/>
			<Tabs.Screen
				name="generator"
				options={{
					title: "Generator",
					headerShown: false,
					tabBarIcon: () => <icons.QrCode className="text-foreground" />,
				}}
			/>
		</Tabs>
	);
}
