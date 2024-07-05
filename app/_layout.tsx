import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { router, SplashScreen, Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
	Platform,
	Pressable,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import icons from "~/lib/icons";
import * as Animatable from "react-native-animatable";
import "~/global.css";

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

	const animateQrRef = React.useRef<any>(null);
	const animateInfoRef = React.useRef<any>(null);

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
				}}>
				<Stack.Screen
					name="index"
					options={{
						headerTitleAlign: "center",
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
						headerRight: () => <ThemeToggle />,
						animation: "slide_from_right",
						title: "Info",
						headerShadowVisible: false,
					}}
				/>
			</Stack>

			<View
				className={cn(
					"flex-row px-6 justify-around items-center border-t-[0.5px] py-1 border-gray-500",
					isDarkColorScheme ? "bg-background" : "bg-white"
				)}>
				<Button
					className="bg-transparent"
					onPress={() => {
						animateQrRef.current?.tada(300);
						handleRouting("/generator");
					}}>
					<Animatable.View ref={animateQrRef}>
						<icons.QrCode className="text-foreground" />
					</Animatable.View>
				</Button>

				<TouchableWithoutFeedback onPress={() => handleRouting("/")}>
					<View
						className={cn(
							"items-center justify-center w-[65px] h-[65px] rounded-full border-8 -translate-y-[35px]",
							isDarkColorScheme ? "border-white" : "border-black",
							isDarkColorScheme ? "bg-black" : "bg-white"
						)}>
						<icons.ScanLine className="text-foreground" />
					</View>
				</TouchableWithoutFeedback>

				<Button
					className="bg-transparent"
					onPress={() => {
						animateInfoRef.current?.shake(300);
						handleRouting("/info");
					}}>
					<Animatable.View ref={animateInfoRef}>
						<icons.Info className="text-foreground" />
					</Animatable.View>
				</Button>
			</View>
			<PortalHost />
		</ThemeProvider>
	);
}
