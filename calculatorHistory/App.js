import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    FlatList,
} from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
    const [calculator, setCalculator] = useState({
        result: 0,
        numbers: { first: 0, second: 0 },
        type: '',
        count: 0,
    });
    const [history, setHistory] = useState([]);

    const onInputChange = (name, value) => {
        setCalculator({ ...calculator, numbers: { ...calculator.numbers, [name]: Number(value) } });
    };

    const increaseButtonPressed = () => {
        setCalculator({
            ...calculator,
            result: calculator.numbers.first + calculator.numbers.second,
            type: 'increase',
            count: calculator.count + 1,
        });
    };

    const decreaseButtonPressed = () => {
        setCalculator({
            ...calculator,
            result: calculator.numbers.first - calculator.numbers.second,
            type: 'increase',
            count: calculator.count + 1,
        });
    };

    useEffect(() => {
        setHistory((prevState) => {
            if (history[0] === undefined && calculator.result === 0) {
                return [];
            }
            const equation = `${calculator.numbers.first} ${
                calculator.type === 'increase' ? '+' : '-'
            } ${calculator.numbers.second} = ${calculator.result}`;
            return [...prevState, { equation }];
        });
    }, [calculator.count]);

    return (
        <View style={styles.container}>
            <Text>Result: {calculator.result}</Text>
            <View>
                <TextInput
                    style={{ width: 150, borderColor: 'gray', borderWidth: 1 }}
                    value={calculator.numbers.first}
                    onChangeText={(text) => onInputChange('first', text)}
                    keyboardType="numeric"
                />
                <TextInput
                    style={{ width: 150, borderColor: 'gray', borderWidth: 1 }}
                    value={calculator.numbers.second}
                    onChangeText={(text) => onInputChange('second', text)}
                    keyboardType="numeric"
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '30%',
                    marginTop: 10,
                }}
            >
                <Button title="+" onPress={increaseButtonPressed} />
                <Button title="-" onPress={decreaseButtonPressed} />
            </View>
            <View
                style={{
                    marginTop: 10,
                }}
            >
                <Text>History</Text>
                <FlatList
                    style={{ maxHeight: 200 }}
                    data={history}
                    renderItem={({ item }) => <Text>{item.equation}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
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
});
