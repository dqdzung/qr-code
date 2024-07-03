import { Tabs } from "expo-router";
import { View } from "react-native";
import icons from "~/lib/icons";
import { useColorScheme } from "~/lib/useColorScheme";

export default function TabLayout() {
	const { isDarkColorScheme } = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					position: "absolute",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: 16,
					bottom: 10,
					height: 60,
					elevation: 0,
				},
			}}
		>
			<Tabs.Screen
				name="generator"
				options={{
					title: "Generator",
					headerShown: false,
					tabBarIcon: () => <icons.QrCode className="text-foreground" />,
				}}
			/>

			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
					title: "Reader",
					tabBarIcon: () => (
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								width: 60,
								height: 60,
								backgroundColor: isDarkColorScheme ? "white" : "black",
								borderRadius: 999,
								marginBottom: 50,
							}}
						>
							<icons.ScanLine className="text-background" />
						</View>
					),
				}}
			/>

			<Tabs.Screen
				name="info"
				options={{
					title: "Reader",
					headerShown: false,
					tabBarIcon: () => <icons.Info className="text-foreground" />,
				}}
			/>
		</Tabs>
	);
}
