// Styles are removed purpose-fully

import React, { useCallback, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import Ordinateur from './Database'

export default function App({ navigation }) {
    const [ordinateurs, setPeople] = useState([])
    const createTable = useCallback(async () => {
        await Ordinateur.createTable()
        console.log('Table created successfully')
    }, [])

    const createOrdinateur = useCallback(async () => {
        const options = {
            columns: 'id, name',
            order: 'name ASC'
          }
          
           
          const test = await Ordinateur.query(options)
          console.log(test)
    }, [])

    //   if (Platform.OS === 'web') {
    //     return <View style={styles.container}>
    //       <Text>Not supported in web platform</Text>
    //     </View>
    //   }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ padding: 20 }} onPress={createTable}>
                <Text>Create table</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 20 }} onPress={createOrdinateur}>
                <Text>Create person</Text>
            </TouchableOpacity>
            <ScrollView style={{ flex: 1 }}>
                {
                    ordinateurs.map(ordinateur => <Text key={ordinateur.id}>{JSON.stringify(ordinateur)}</Text>)
                }
            </ScrollView>
            <Button
                title="Ordinateurs"
                onPress={() => navigation.navigate('Ordinateurs')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
});
