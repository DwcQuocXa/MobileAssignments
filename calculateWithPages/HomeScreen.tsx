import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { RootStackParamList, Data } from "./App";
import { StackNavigationProp } from "@react-navigation/stack";

type homeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: homeScreenProps) {
  const [Number1, setNumber1] = useState<string>("");
  const [Number2, setNumber2] = useState<string>("");
  const [sign, setSign] = useState<string>();
  const [result, setResult] = useState<number>();
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    if (sign) {
      setData([...data, { content: `${Number1} ${sign} ${Number2} = ${result}` }]);
      setNumber1("");
      setNumber2("");
      setSign("");
    }
  }, [result, sign]);

  const covertDecimal = (numberStr: string): number => {
    return parseFloat(numberStr.replace(",", "."));
  };

  const handleOperation = (sign: string): void => {
    if (sign === "+") {
      setResult(covertDecimal(Number1) + covertDecimal(Number2));
      setSign("+");
    } else if (sign === "-") {
      setResult(covertDecimal(Number1) - covertDecimal(Number2));
      setSign("-");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Result: {result}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(input) => setNumber1(input)}
          value={Number1}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(input) => setNumber2(input)}
          value={Number2}
        />
        <View style={styles.btn}>
          <Button
            title="+"
            onPress={() => handleOperation("+")}
            disabled={!(Number1 && Number2)}
          />
          <Button
            title="-"
            onPress={() => handleOperation("-")}
            disabled={!(Number1 && Number2)}
          />
          <Button
            title="History"
            onPress={() => navigation.navigate("History", { operation: data })}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
  },
  btn: {
    flexDirection: "row",
  },
});
