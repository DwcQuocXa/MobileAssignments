import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';

const db = SQLite.openDatabase('shoppingdb.db');

type item = { id: string; product: string; amount: string };
type list = item[];

export default function App() {
    const [item, setItem] = useState<item>({ id: '', product: '', amount: '' });
    const [list, setList] = useState<list>([]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS shopping_list (id text primary key not null, product text, amount text);',
            );
        });
        updateList();
    }, []);

    const saveItem = () => {
        setItem({ ...item, id: uuid.v4().toString() });
        db.transaction(
            (tx) => {
                tx.executeSql('INSERT INTO shopping_list (id, product, amount) VALUES (?, ?,?);', [
                    item.id,
                    item.product,
                    item.amount,
                ]);
            },
            undefined,
            updateList,
        );
    };

    const updateList = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM shopping_list;', [], (_, { rows }) => setList(rows._array));
        });
    };

    const deleteItem = (id) => {
        db.transaction(
            (tx) => {
                tx.executeSql('DELETE FROM shopping_list WHERE id = ?;', [id]);
            },
            undefined,
            updateList,
        );
    };

    const handleClear = () => {
        setItem({ id: '', product: '', amount: '' });
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
                style={{ marginLeft: '5%' }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listcontainer}>
                        <Text style={{ fontSize: 18 }}>{item.product}, {item.amount}</Text>
                        <Text style={{ fontSize: 18, color: '#0000ff' }} onPress={() => deleteItem(item.id)}>
                            Bought
                        </Text>
                    </View>
                )}
                data={list}
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
