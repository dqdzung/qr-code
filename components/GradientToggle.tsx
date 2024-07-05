import { Pressable } from "react-native";
import { cn } from "~/lib/utils";
import * as Animatable from "react-native-animatable";
import { useRef } from "react";
import icons from "~/lib/icons";

const GradientToggle = ({ handlePress }: { handlePress: () => void }) => {
	const animateRef = useRef<any>(null);

	return (
		<Pressable
			onPress={handlePress}
			className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2">
			{({ pressed }) => (
				<Animatable.View
					ref={animateRef}
					className={cn(
						"flex-1 aspect-square pt-0.5 justify-center items-start web:px-5",
						pressed && "opacity-70"
					)}>
					<icons.Palette className="text-foreground" />
				</Animatable.View>
			)}
		</Pressable>
	);
};

export default GradientToggle;
