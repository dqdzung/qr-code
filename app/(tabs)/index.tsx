import { View, Text, StyleSheet } from "react-native";
import {
	BarcodeScanningResult,
	CameraView,
	useCameraPermissions,
} from "expo-camera";
import { Button } from "~/components/ui/button";
import icons from "~/lib/icons";
import { useState } from "react";
import ScanResult from "~/components/ScanResult";

export default function TabHome() {
	const [permission, requestPermission] = useCameraPermissions();
	const [scanned, setScanned] = useState(false);
	const [content, setContent] = useState("");

	const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
		setScanned(true);
		setContent(data);
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
				<Button variant={"destructive"} onPress={requestPermission}>
					<Text style={{ color: "white" }}>Grant Permission</Text>
				</Button>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{!scanned ? (
				<CameraView
					style={styles.camera}
					facing={"back"}
					onBarcodeScanned={handleBarCodeScanned}
				>
					<View style={styles.iconContainer}>
						<icons.Scan size={450} strokeWidth={0.4} stroke={"white"} />
					</View>
				</CameraView>
			) : (
				<ScanResult content={content} handleRescan={() => setScanned(false)} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
	camera: {
		flex: 1,
		maxHeight: 400,
		width: "100%",
	},
	iconContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
	},
});

// borderColor: "red",
// borderWidth: 1,
