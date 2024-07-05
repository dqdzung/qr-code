import { Text, ToastAndroid, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import RNFS from "react-native-fs";
import * as MediaLibrary from "expo-media-library";
import { Button } from "./ui/button";
import icons from "~/lib/icons";
import logo from "~/assets/images/avatar.png";
import * as Animatable from "react-native-animatable";
import ColorPicker, { HueSlider } from "reanimated-color-picker";
import { buttonContentClass } from "./GeneratorInput";
import { Toggle } from "./ui/toggle";
import { useNavigation } from "expo-router";
import GradientToggle from "./GradientToggle";

const DEFAULT_GRADIENT = ["#3F94FB", "#FC466B"];

const GeneratorResult = ({
	content,
	onReset,
}: {
	content: string;
	onReset: () => void;
}) => {
	const navigation = useNavigation();
	const animateRef = useRef<any>(null);

	const [qrRef, setQrRef] = useState<any>(null);
	const [gradient, setGradient] = useState<string[]>(DEFAULT_GRADIENT);
	const [enableGradient, setEnableGradient] = useState(false);
	const [saved, setSaved] = useState(false);

	const handleReset = () => {
		navigation.setOptions({ headerRight: () => null });
		setQrRef(null);
		setEnableGradient(false);
		setGradient(DEFAULT_GRADIENT);
		setSaved(false);
		onReset();
	};

	const handleSave = async () => {
		const permission = await MediaLibrary.requestPermissionsAsync();
		if (!permission) return;
		if (qrRef) {
			qrRef.toDataURL((data: any) => {
				let filePath = RNFS.CachesDirectoryPath + `/qr.png`;
				RNFS.writeFile(filePath, data, "base64")
					.then(() => {
						return MediaLibrary.saveToLibraryAsync(filePath);
					})
					.then(() => {
						ToastAndroid.show("Saved", ToastAndroid.SHORT);
						setSaved(true);
					});
			});
		}
	};

	const onSelectColor = (hex: string, index: number) => {
		setGradient((prev) => {
			const newGradient = [...prev];
			newGradient[index] = hex;
			return newGradient;
		});
		setSaved(false);
	};

	useEffect(() => {
		animateRef.current?.zoomIn(100).then(() => animateRef.current?.tada(400));
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<GradientToggle
					handlePress={() => {
						setEnableGradient(!enableGradient);
						setSaved(false);
					}}
				/>
			),
		});
	}, [enableGradient]);

	return (
		<View className="flex-1 gap-3 align-center">
			<Animatable.View
				ref={animateRef}
				className="items-center justify-center flex-1 gap-5">
				<QRCode
					quietZone={10}
					value={content}
					size={350}
					getRef={(c) => setQrRef(c)}
					logo={logo}
					logoMargin={5}
					enableLinearGradient={enableGradient}
					linearGradient={gradient}
					logoBackgroundColor="transparent"
					logoBorderRadius={100}
					logoSize={70}
				/>
				{enableGradient && (
					<View className="w-full items-center gap-5">
						<ColorPicker
							style={{ width: "70%" }}
							value={gradient[0]}
							onComplete={({ hex }) => onSelectColor(hex, 0)}>
							<HueSlider thumbShape="pill" thumbColor="white" />
						</ColorPicker>

						<ColorPicker
							style={{ width: "70%" }}
							value={gradient[1]}
							onComplete={({ hex }) => onSelectColor(hex, 1)}>
							<HueSlider thumbShape="pill" thumbColor="white" />
						</ColorPicker>
					</View>
				)}
			</Animatable.View>

			<View className="gap-3 pb-10">
				<Button variant="default" onPress={handleSave} disabled={saved}>
					<View className={buttonContentClass}>
						<icons.ImageDown className="text-background" size={20} />
						<Text className="text-background">Save</Text>
					</View>
				</Button>
				<Button
					disabled={content === ""}
					variant="destructive"
					onPress={handleReset}>
					<View className={buttonContentClass}>
						<icons.Trash className="text-white" size={20} />
						<Text className="text-white">Clear</Text>
					</View>
				</Button>
			</View>
		</View>
	);
};

export default GeneratorResult;
