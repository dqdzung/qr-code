import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import icons from "~/lib/icons";
import * as Linking from "expo-linking";
import * as Clipboard from "expo-clipboard";
import { isUrlValid } from "~/lib/utils";
import { buttonContentClass, textareaClass } from "./GeneratorInput";

const ScanResult = ({
	content,
	handleClear,
}: {
	content: string;
	handleClear: () => void;
}) => {
	const [isCopied, setCopied] = useState(false);

	const handleGoToLink = () => {
		Linking.openURL(content);
	};
	const handleCopyClipboard = async () => {
		await Clipboard.setStringAsync(content);
		setCopied(true);
	};

	return (
		<View className="w-full justify-center px-3 gap-3 flex-1">
			<Textarea
				className={textareaClass}
				placeholder="Result..."
				value={content}
				editable={false}
			/>
			<View className="flex-1 gap-3">
				<View className="flex-row gap-3 justify-center">
					<Button className="flex-1 bg-green-700" onPress={handleGoToLink}>
						<View className={buttonContentClass}>
							<icons.Link color="white" size={20} />
							<Text className="text-white">Go to URL</Text>
						</View>
					</Button>

					<Button
						className="flex-1"
						onPress={handleCopyClipboard}
						disabled={isCopied}>
						<View className={buttonContentClass}>
							{!isCopied ? (
								<>
									<icons.Copy className="text-background" size={20} />
									<Text className="text-background">Copy</Text>
								</>
							) : (
								<Text className="text-background">Copied!</Text>
							)}
						</View>
					</Button>
				</View>
				<Button variant="destructive" onPress={handleClear}>
					<View className={buttonContentClass}>
						<icons.Trash color="white" size={20} />
						<Text className="text-white">Clear</Text>
					</View>
				</Button>
			</View>
		</View>
	);
};

export default ScanResult;
