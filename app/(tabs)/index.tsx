import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button } from "~/components/ui/button";
import icons from "~/lib/icons";
import { useState } from "react";

export default function TabHome() {
	const [permission, requestPermission] = useCameraPermissions();
	const [scanned, setScanned] = useState(false);

	const handleBarCodeScanned = ({ type, data }: any) => {
		setScanned(true);
		console.log(
			`Bar code with type ${type} and data ${data} has been scanned!`
		);
	};

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View style={styles.container}>
				<Text className="text-foreground">
					We need your permission to show the camera
				</Text>
				<Button
					variant={"destructive"}
					onPress={requestPermission}
					style={{ marginVertical: 15 }}
				>
					<Text style={{ color: "white" }}>Grant Permission</Text>
				</Button>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<CameraView
				style={styles.camera}
				facing={"back"}
				onBarcodeScanned={handleBarCodeScanned}
			>
				<View style={styles.buttonContainer}>
					<icons.Scan size={500} strokeWidth={0.6} stroke={"white"} />
				</View>
			</CameraView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	camera: {
		flex: 1,
		width: "100%",
	},
	buttonContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
});
