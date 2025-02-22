import { Text, View } from "react-native";
import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import * as Clipboard from "expo-clipboard";
import icons from "~/lib/icons";

export const buttonContentClass = "flex-row items-center gap-2";
export const textareaClass = "border-red-600 text-lg flex-1";

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
		if (string) setContent(string);
	};

	return (
		<View className="w-full gap-3 flex-1 pb-10">
			<Textarea
				className={textareaClass}
				placeholder="Content..."
				value={content}
				onChangeText={setContent}
			/>
			<View className="flex-row gap-3">
				<Button
					className="flex-1"
					variant="default"
					onPress={handlePasteClipboard}>
					<View className={buttonContentClass}>
						<icons.Paste className="text-background" size={20} />
						<Text className="text-background">Paste from clipboard</Text>
					</View>
				</Button>
			</View>
			<Button
				disabled={content === ""}
				variant={"destructive"}
				onPress={handleGenerate}>
				<View className={buttonContentClass}>
					<icons.QrCode color="white" size={20} />
					<Text style={{ color: "white" }}>Generate</Text>
				</View>
			</Button>
		</View>
	);
};

export default GeneratorInput;
