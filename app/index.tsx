import { View, Text, StyleSheet } from "react-native";
import {
	BarcodeScanningResult,
	CameraView,
	useCameraPermissions,
} from "expo-camera";
import { Button } from "~/components/ui/button";
import icons from "~/lib/icons";
import { useRef, useState } from "react";
import ScanResult from "~/components/ScanResult";

const containerClass = "flex-1 items-center justify-center gap-3";

export default function TabHome() {
	const [permission, requestPermission] = useCameraPermissions();

	const [content, setContent] = useState("");
	const [scanned, setScanned] = useState(false);
	const [flashOn, setFlashOn] = useState(false);

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
			<View className={containerClass}>
				<Text className="text-foreground">
					We need your permission to show the camera
				</Text>
				<Button variant="destructive" onPress={requestPermission}>
					<Text className="text-white">Grant Permission</Text>
				</Button>
			</View>
		);
	}

	return (
		<View className={containerClass}>
			{!scanned ? (
				<>
					<CameraView
						className="w-full flex-1"
						style={{ maxHeight: 400 }}
						facing="back"
						enableTorch={flashOn}
						onBarcodeScanned={handleBarCodeScanned}
					>
						<View className="flex-1 items-center justify-center">
							<icons.Scan size={450} strokeWidth={0.4} className="text-white" />
						</View>
					</CameraView>

					<Button
						className="mt-12 w-[150px]"
						onPress={() => setFlashOn(!flashOn)}
						size="lg"
					>
						{!flashOn ? (
							<icons.Zap className="text-background" />
						) : (
							<icons.ZapOff className="text-background" />
						)}
					</Button>
				</>
			) : (
				<ScanResult content={content} handleRescan={() => setScanned(false)} />
			)}
		</View>
	);
}
