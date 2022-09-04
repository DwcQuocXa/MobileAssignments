import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Alert, Button } from 'react-native';

export default function App() {
    const randomNumber = (): number => Math.floor(Math.random() * 100) + 1;
    const [count, setCount]: [number, Function] = useState(0);
    const [secretNumber, setSecretNumber]: [number, Function] = useState(
        randomNumber(),
    );
    const [content, setContent]: [string, Function] = useState(
        'Guess number between 1-100',
    );
    const [guessNumber, setGuessNumber]: [string, Function] = useState('');

    const guestResult = () => {
        if (secretNumber === parseInt(guessNumber)) {
            Alert.alert(
                `Secret Number is ${secretNumber}`,
                `You guessed the number in ${count} guess`,
                [
                    {
                        text: 'Cancel',
                        onPress: () => setContent('Guess number between 1-100'),
                    },
                ],
            );
            setGuessNumber('');
            setCount(0);
            setSecretNumber(randomNumber());
        } else if (secretNumber > parseInt(guessNumber)) {
            setContent('Your guess is too low');
            setCount(count + 1);
            setGuessNumber('');
        } else if (secretNumber < parseInt(guessNumber)) {
            setContent('Your guess is higer');
            setCount(count + 1);
            setGuessNumber('');
        }
    };
    return (
        <View style={styles.container}>
            <Text>{content}</Text>
            <TextInput
                style={styles.textInput}
                value={guessNumber.toString()}
                onChangeText={(input) => setGuessNumber(input)}
            />
            <StatusBar style="auto" />
            <Button title="guess" onPress={guestResult} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
    },
});
