import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface Recipes {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

export default function App() {
    const [input, setInput] = useState<string>('');
    const [recipes, setRecipes] = useState<Recipes[]>([]);

    const findRecipes = async () => {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`,
        );
        const { meals } = await response.json();
        console.log(meals)
        setRecipes(meals);
    };
    const handleFind = async () => {
        await findRecipes();
        setInput('');
    };

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={input}
                    onChangeText={(input) => setInput(input)}
                    placeholder="Search for ingredients"
                    onSubmitEditing={() => findRecipes()}
                />
                <Button
                    title="Find"
                    onPress={() => handleFind()}
                    disabled={!input}
                />
            </View>
            <View style={styles.resultList}>
                {recipes ? (
                    <FlatList
                        data={recipes}
                        renderItem={({ item }) => (
                            <View style={styles.recipeList}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={{
                                        uri: item.strMealThumb,
                                    }}
                                />
                                <Text style={styles.foodName}>
                                    {item.strMeal}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.idMeal}
                    />
                ) : (
                    <Text>No result</Text>
                )}
            </View>
            <StatusBar style="auto" />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
    },
    btn: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    textInput: {
        width: 200,
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        margin: 15,
    },
    resultList: {
        alignItems: 'center',
    },
    recipeList: {
        flexDirection: 'row',
        padding: 10,
    },
    tinyLogo: {
        width: 60,
        height: 60,
        borderRadius: 100,
        margin: 5,
    },
    foodName: {
        marginLeft: 10,
        alignSelf: 'center',
        fontSize: 20,
    },
});
