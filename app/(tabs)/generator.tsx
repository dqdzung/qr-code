import { useState } from "react";
import { View, StyleSheet } from "react-native";
import GeneratorInput from "~/components/GeneratorInput";
import GeneratorResult from "~/components/GeneratorResult";

export default function TabGenerator() {
	const [content, setContent] = useState("");
	const [generated, setGenerated] = useState(false);

	const handleGenerate = () => {
		setGenerated(true);
	};

	const onReset = () => {
		setGenerated(false);
		setContent("");
	};

	return (
		<View style={styles.result}>
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

const styles = StyleSheet.create({
	result: {
		width: "100%",
		justifyContent: "center",
		paddingHorizontal: 10,
		gap: 10,
		flex: 1,
	},
});
