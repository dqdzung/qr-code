import React from "react";
import {Pressable, Text, View} from "react-native";
import * as Linking from "expo-linking";

const TabInfo = () => {
	return (
		<View className="flex-1 items-center justify-center gap-3">
			<Pressable
				onPress={() => Linking.openURL("https://github.com/dqdzung/qr-code")}>
				<Text className="text-foreground underline text-xl">
					@hihi_haha_hoho
				</Text>
			</Pressable>
		</View>
	);
};

export default TabInfo;
