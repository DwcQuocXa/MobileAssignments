import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function HistoryScreen({ route }: any) {
  const { operation } = route.params;
  return (
    <View style={styles.listContainer}>
      <Text>History</Text>
      <FlatList
        data={operation}
        renderItem={({ item }) => <Text>{item.content}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 2,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
