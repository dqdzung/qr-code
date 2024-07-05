import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { MoonStar } from "~/lib/icons/MoonStar";
import { Sun } from "~/lib/icons/Sun";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";
import * as Animatable from "react-native-animatable";
import { useRef } from "react";

export function ThemeToggle() {
	const { isDarkColorScheme, setColorScheme } = useColorScheme();

	const animateRef = useRef<any>(null);

	return (
		<Pressable
			onPress={() => {
				animateRef.current
					?.zoomOut(200)
					.then(() => animateRef.current?.tada(300));
				const newTheme = isDarkColorScheme ? "light" : "dark";
				setColorScheme(newTheme);
				setAndroidNavigationBar(newTheme);
				AsyncStorage.setItem("theme", newTheme);
			}}
			className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2">
			{({ pressed }) => (
				<Animatable.View
					ref={animateRef}
					className={cn(
						"flex-1 aspect-square pt-0.5 justify-center items-start web:px-5",
						pressed && "opacity-70"
					)}>
					{isDarkColorScheme ? (
						<MoonStar
							className="text-foreground"
							size={23}
							strokeWidth={1.25}
						/>
					) : (
						<Sun className="text-foreground" size={24} strokeWidth={1.25} />
					)}
				</Animatable.View>
			)}
		</Pressable>
	);
}
