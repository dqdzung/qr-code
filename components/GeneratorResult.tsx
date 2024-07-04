import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import RNFS from "react-native-fs";
import * as MediaLibrary from "expo-media-library";
import { Button } from "./ui/button";
import icons from "~/lib/icons";
import logo from "~/assets/images/avatar.png";

const GeneratorResult = ({
	content,
	onReset,
}: {
	content: string;
	onReset: () => void;
}) => {
	const [qrRef, setQrRef] = useState<any>(null);

	const handleReset = () => {
		onReset();
		setQrRef(null);
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

	return (
		<>
			<View style={styles.qrContainer}>
				<QRCode
					quietZone={10}
					value={content}
					size={300}
					getRef={(c) => setQrRef(c)}
					logo={logo}
					logoMargin={5}
					enableLinearGradient
					linearGradient={["#3F94FB", "#FC466B"]}
					logoBackgroundColor="transparent"
					logoBorderRadius={100}
					logoSize={70}
				/>
			</View>
			<Button variant={"default"} onPress={handleSave}>
				<View style={styles.buttonContent}>
					<icons.Paste className="text-background" size={20} />
					<Text className="text-background">Save</Text>
				</View>
			</Button>
			<Button
				disabled={content === ""}
				variant={"destructive"}
				onPress={handleReset}
			>
				<View style={styles.buttonContent}>
					<icons.Trash color={"white"} size={20} />
					<Text style={{ color: "white" }}>Clear</Text>
				</View>
			</Button>
		</>
	);
};

export default GeneratorResult;

const styles = StyleSheet.create({
	qrContainer: { alignItems: "center", marginVertical: 10 },
	buttonContent: {
		flexDirection: "row",
		gap: 5,
		alignItems: "center",
	},
});
