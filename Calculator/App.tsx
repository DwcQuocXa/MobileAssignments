import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
} from 'react-native'

export default function App () {
    const [firstInput, setFirstInput]: [string | null, Function] = useState(null)
    const [secondInput, setSecondInput]: [string | null, Function] = useState(null)
    const [result, setResult]: [number, Function] = useState(0)

    const plus = () => {
        const result = parseFloat(firstInput.replace(',', '.')) + parseFloat(secondInput.replace(',', '.'))
        setResult(result)
        setFirstInput(null)
        setSecondInput(null)
    }
    const minus = () => {
        const result = parseFloat(firstInput.replace(',', '.')) - parseFloat(secondInput.replace(',', '.'))
        setResult(result)
        setFirstInput(null)
        setSecondInput(null)
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <TextInput
                    style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
                    value={firstInput}
                    keyboardType="numeric"
                    onChangeText={(input) => setFirstInput(input)}
                />
                <TextInput
                    style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
                    value={secondInput}
                    keyboardType="numeric"
                    onChangeText={(input) => setSecondInput(input)}
                />
                <Text>Result: {result}</Text>
            </View>
            <View style={styles.button}>
                <Button
                    disabled={!(firstInput && secondInput)}
                    color="blue"
                    title="+"
                    onPress={plus}
                />
                <Button
                    disabled={!(firstInput && secondInput)}
                    title="-"
                    onPress={minus}
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
        justifyContent: 'center'
    },
    button: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'flex-start'
    }
})
