import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TabTest = () => {
	return (
		<View style={styles.container}>
			<Text className="text-foreground">
				https://github.com/dqdzung/qr-code
			</Text>
		</View>
	);
};

export default TabTest;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
});
