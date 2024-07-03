import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import icons from "~/lib/icons";
import * as Linking from "expo-linking";
import * as Clipboard from "expo-clipboard";
import { isUrlValid } from "~/lib/utils";

const ScanResult = ({
	content,
	handleRescan,
}: {
	content: string;
	handleRescan: () => void;
}) => {
	const [isCopied, setCopied] = useState(false);
	const isContentURL = useMemo(() => isUrlValid(content), [content]);

	const handleGoToLink = () => {
		if (isContentURL) Linking.openURL(content);
	};
	const handleCopyClipboard = async () => {
		await Clipboard.setStringAsync(content);
		setCopied(true);
	};

	return (
		<View style={styles.result}>
			<Textarea
				style={styles.textarea}
				placeholder="Result..."
				value={content}
				editable={false}
			/>

			<View style={styles.buttonContainer}>
				<Button
					variant={"destructive"}
					onPress={handleRescan}
					style={{ flex: 1 }}
				>
					<View style={styles.buttonContent}>
						<icons.Refresh color={"white"} size={20} />
						<Text style={{ color: "white" }}>Scan again</Text>
					</View>
				</Button>
				{isContentURL && (
					<Button
						variant={"default"}
						onPress={handleGoToLink}
						style={{ flex: 1, backgroundColor: "green" }}
					>
						<View style={styles.buttonContent}>
							<icons.Link color={"white"} size={20} />
							<Text style={{ color: "white" }}>Go to URL</Text>
						</View>
					</Button>
				)}
			</View>

			<Button
				variant={"default"}
				onPress={handleCopyClipboard}
				disabled={isCopied}
			>
				<View style={styles.buttonContent}>
					{!isCopied ? (
						<>
							<icons.Clipboard className="text-background" size={20} />
							<Text className="text-background">Copy to clipboard</Text>
						</>
					) : (
						<Text className="text-background">Copied!</Text>
					)}
				</View>
			</Button>
		</View>
	);
};

export default ScanResult;

const styles = StyleSheet.create({
	result: {
		width: "100%",
		justifyContent: "center",
		paddingHorizontal: 10,
		gap: 10,
		flex: 1,
	},
	textarea: {
		borderColor: "red",
		fontSize: 18,
		flex: 1,
		maxHeight: 300,
	},
	buttonContainer: {
		flexDirection: "row",
		gap: 10,
		justifyContent: "center",
	},
	buttonContent: {
		flexDirection: "row",
		gap: 5,
		alignItems: "center",
	},
});
