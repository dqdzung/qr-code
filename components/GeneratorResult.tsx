import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import RNFS from "react-native-fs";
import * as MediaLibrary from "expo-media-library";
import { Button } from "./ui/button";
import icons from "~/lib/icons";
import logo from "~/assets/images/avatar.png";
import * as Animatable from "react-native-animatable";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import ColorPicker, { HueSlider } from "reanimated-color-picker";
import { useColorScheme } from "~/lib/useColorScheme";
import { buttonContentClass } from "./GeneratorInput";

const DEFAULT_GRADIENT = ["#3F94FB", "#FC466B"];

const GeneratorResult = ({
	content,
	onReset,
}: {
	content: string;
	onReset: () => void;
}) => {
	const [qrRef, setQrRef] = useState<any>(null);

	const animateRef = useRef<any>(null);

	const [enableGradient, setEnableGradient] = useState(false);
	const [gradient, setGradient] = useState<string[]>(DEFAULT_GRADIENT);

	const handleReset = () => {
		onReset();
		setQrRef(null);
		setEnableGradient(false);
		setGradient(DEFAULT_GRADIENT);
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
						ToastAndroid.show("Saved to gallery", ToastAndroid.LONG);
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
	};

	useEffect(() => {
		animateRef.current?.zoomIn(100).then(() => animateRef.current?.tada(400));
	}, []);

	return (
		<>
			<View className="w-full items-center gap-5">
				<View className="flex-row items-center gap-2">
					<Switch
						checked={enableGradient}
						onCheckedChange={setEnableGradient}
						nativeID="linear-gradient"
					/>
					<Label
						nativeID="linear-gradient"
						onPress={() => setEnableGradient((prev) => !prev)}
					>
						Linear gradient
					</Label>
				</View>

				{enableGradient && (
					<View className={"w-full items-center gap-5"}>
						<ColorPicker
							style={{ width: "70%" }}
							value={gradient[0]}
							onComplete={({ hex }) => onSelectColor(hex, 0)}
						>
							<HueSlider thumbShape="pill" thumbColor="white" />
						</ColorPicker>

						<ColorPicker
							style={{ width: "70%" }}
							value={gradient[1]}
							onComplete={({ hex }) => onSelectColor(hex, 1)}
						>
							<HueSlider thumbShape="pill" thumbColor="white" />
						</ColorPicker>
					</View>
				)}
			</View>

			<Animatable.View ref={animateRef} className="items-center my-3">
				<QRCode
					quietZone={10}
					value={content}
					size={300}
					getRef={(c) => setQrRef(c)}
					logo={logo}
					logoMargin={5}
					enableLinearGradient={enableGradient}
					linearGradient={gradient}
					logoBackgroundColor="transparent"
					logoBorderRadius={100}
					logoSize={70}
				/>
			</Animatable.View>
			<Button variant={"default"} onPress={handleSave}>
				<View className={buttonContentClass}>
					<icons.Paste className="text-background" size={20} />
					<Text className="text-background">Save</Text>
				</View>
			</Button>
			<Button
				disabled={content === ""}
				variant={"destructive"}
				onPress={handleReset}
			>
				<View className={buttonContentClass}>
					<icons.Trash color={"white"} size={20} />
					<Text style={{ color: "white" }}>Clear</Text>
				</View>
			</Button>
		</>
	);
};

export default GeneratorResult;