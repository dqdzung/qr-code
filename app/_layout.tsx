import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { router, SplashScreen, Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, Pressable, TouchableOpacity, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import "~/global.css";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import icons from "~/lib/icons";

const LIGHT_THEME: Theme = {
	dark: false,
	colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
	dark: true,
	colors: NAV_THEME.dark,
};

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const pathname = usePathname();
	const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
	const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

	const handleRouting = (key: string) => {
		if (key === pathname) return;
		router.replace(key);
	};

	React.useEffect(() => {
		(async () => {
			const theme = await AsyncStorage.getItem("theme");
			if (Platform.OS === "web") {
				// Adds the background color to the html element to prevent white background on overscroll.
				document.documentElement.classList.add("bg-background");
			}
			if (!theme) {
				AsyncStorage.setItem("theme", colorScheme);
				setIsColorSchemeLoaded(true);
				return;
			}
			const colorTheme = theme === "dark" ? "dark" : "light";
			if (colorTheme !== colorScheme) {
				setColorScheme(colorTheme);

				setIsColorSchemeLoaded(true);
				return;
			}
			setIsColorSchemeLoaded(true);
		})().finally(() => {
			SplashScreen.hideAsync();
		});
	}, []);

	if (!isColorSchemeLoaded) {
		return null;
	}

	return (
		<ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
			<StatusBar style={isDarkColorScheme ? "light" : "dark"} />
			<Stack
				screenOptions={{
					headerBackButtonMenuEnabled: false,
					headerRight: () => <ThemeToggle />,
				}}
			>
				<Stack.Screen
					name="index"
					options={{
						animation: "fade_from_bottom",
						title: "QR Reader",
					}}
				/>
				<Stack.Screen
					name="generator"
					options={{
						animation: "slide_from_left",
						title: "QR Generator",
					}}
				/>
				<Stack.Screen
					name="info"
					options={{
						animation: "slide_from_right",
						title: "Info",
					}}
				/>
			</Stack>

			<View
				className={cn(
					"flex-row px-6 py-3 justify-around items-center pb-6",
					isDarkColorScheme ? "bg-background" : "bg-white"
				)}
			>
				<TouchableOpacity onPress={() => handleRouting("/generator")}>
					<icons.QrCode className="text-foreground" />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => handleRouting("/")}>
					<View
						className={cn(
							"items-center justify-center w-20 h-20 rounded-full border-8",
							isDarkColorScheme ? "border-white" : "border-black",
							isDarkColorScheme ? "bg-black" : "bg-white"
						)}
					>
						<icons.ScanLine className="text-foreground" />
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => handleRouting("/info")}>
					<icons.Info className="text-foreground" />
				</TouchableOpacity>
			</View>
			<PortalHost />
		</ThemeProvider>
	);
}
