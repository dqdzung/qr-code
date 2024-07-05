import { useState } from "react";
import { ToastAndroid, View } from "react-native";
import GeneratorInput from "~/components/GeneratorInput";
import GeneratorResult from "~/components/GeneratorResult";

export default function TabGenerator() {
	const [content, setContent] = useState("");
	const [generated, setGenerated] = useState(false);

	const handleGenerate = () => {
		if (content === "") return;
		if (content.length > 1000) {
			ToastAndroid.show("Content too long for QR", ToastAndroid.SHORT);
			return;
		}
		setGenerated(true);
	};

	const onReset = () => {
		setGenerated(false);
		setContent("");
	};

	return (
		<View className="flex-1 w-full justify-center px-3 gap-3">
			{!generated ? (
				<GeneratorInput
					content={content}
					setContent={setContent}
					handleGenerate={handleGenerate}
				/>
			) : (
				<GeneratorResult content={content} onReset={onReset} />
			)}
		</View>
	);
}
