import { View, Text, StyleSheet } from "react-native";

export default function TabSettings() {
	return (
		<View style={styles.container}>
			<Text className="text-foreground">Settings</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
