import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';
import { db } from './config';
import { ref, push, onValue, remove } from 'firebase/database';


type item = { id: string; product: string; amount: string };
interface list {
    list: item[];
    keys: string[];
}

export default function App() {
    const [item, setItem] = useState<item>({ id: '', product: '', amount: '' });
    const [list, setList] = useState<list>({list: [{ id: '', product: '', amount: '' }], keys:['']});

    useEffect(() => {
        onValue(ref(db, 'items'), (snapshot) => {
            const data = snapshot.val();
            if (data)
                setList({ ...list, list: Object.values(data), keys: Object.keys(data) });
        });
    }, []);

    const saveItem = () => {
        setItem({ ...item, id: uuid.v4().toString() });
        push(ref(db, 'items/'), {
            id: item.id,
            product: item.product,
            amount: item.amount,
        });
    };

    const deleteItem = (index) => {
        remove(ref(db,"items/" + list.keys[index]));
        setList({list: [{ id: '', product: '', amount: '' }], keys:['']});
    };

    const handleClear = () => {
        setItem({ id: '', product: '', amount: '' });
    };

    const listSeparator = () => {
        return (
            <View
                style={{
                    height: 5,
                    width: "80%",
                    backgroundColor: "#fff",
                    marginLeft: "10%",
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Product"
                    onChangeText={(input) => setItem({ ...item, product: input })}
                    value={item.product}
                />
                <StatusBar style="auto" />
                <TextInput
                    style={styles.textInput}
                    placeholder="Amount"
                    onChangeText={(input) => setItem({ ...item, amount: input })}
                    value={item.amount}
                />
                <StatusBar style="auto" />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Button title="ADD" onPress={saveItem} />
                <Button title="CLEAR" onPress={handleClear} />
            </View>
            <Text style={{ color: 'blue' }}>Shopping list</Text>

            <FlatList
                style={{ marginLeft: "5%" }}
                keyExtractor={(item, index) => index.toString()}
                data={list.list}
                renderItem={({ item, index }) => (
                    <View style={styles.listcontainer}>
                        <Text style={{ fontSize: 15 }}>
                            {item.product}, {item.amount}
                        </Text>
                        <Text
                            style={{ fontSize: 15, color: "#0000ff", marginLeft: 5 }}
                            onPress={() => deleteItem(index)}
                        >
                            bought
                        </Text>
                    </View>
                )}
                ItemSeparatorComponent={listSeparator}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    listcontainer: {
        flex: 2,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textInput: {
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
    },
});
