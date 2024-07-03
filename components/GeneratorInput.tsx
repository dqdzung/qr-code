import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import * as Clipboard from "expo-clipboard";
import icons from "~/lib/icons";

const GeneratorInput = ({
	content,
	setContent,
	handleGenerate,
}: {
	content: string;
	setContent: (content: string) => void;
	handleGenerate: () => void;
}) => {
	const handlePasteClipboard = async () => {
		const string = await Clipboard.getStringAsync();
		setContent(string);
	};

	return (
		<>
			<Textarea
				style={styles.textarea}
				placeholder="Content..."
				value={content}
				onChangeText={setContent}
			/>
			<Button variant={"default"} onPress={handlePasteClipboard}>
				<View style={styles.buttonContent}>
					<icons.Paste className="text-background" size={20} />
					<Text className="text-background">Paste from clipboard</Text>
				</View>
			</Button>
			<Button
				disabled={content === ""}
				variant={"destructive"}
				onPress={handleGenerate}
			>
				<View style={styles.buttonContent}>
					<icons.QrCode color={"white"} size={20} />
					<Text style={{ color: "white" }}>Generate</Text>
				</View>
			</Button>
		</>
	);
};

export default GeneratorInput;

const styles = StyleSheet.create({
	textarea: {
		borderColor: "red",
		fontSize: 18,
		flex: 1,
		maxHeight: 300,
	},
	buttonContent: {
		flexDirection: "row",
		gap: 5,
		alignItems: "center",
	},
});
