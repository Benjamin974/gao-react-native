import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, TextInput } from 'react-native';
import AddOrdi from './components/AddOrdi'
import * as SQLite from 'expo-sqlite'
import Ordinateur from './Database';
const db = SQLite.openDatabase('gao-react.db'); // returns Database object

class About extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            text: '',
            modalVisible: false
        }
        // Check if the items table exists if not create it
        this.fetchData();
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS ordinateurs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
            )
        })
        this.handleChangeOrdinateurName = this.handleChangeOrdinateurName.bind(this);


    }

    async componentDidMount() {
		// const products = await Ordinateur.find(1);
		// console.log('Todo el carrito:\n', products);

		// this.setState({products});
	}

    fetchData = () => {
        let array = []
        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM ordinateurs', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (_, { rows }) => {

                    for (let i = 0; i < rows.length; i++) {
                        array.push(rows.item(i))
                    }
                    this.setState({
                        data: array
                    })
                },
                // failure callback which sends two things Transaction object and Error
                (_, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction
    }

    newItem = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO ordinateurs (name) values (?)', [this.state.text],
                (_, resultSet) => this.setState({
                    data: this.state.data.concat(
                        { id: resultSet.insertId, name: this.state.text })
                }),
                (txObj, error) => console.log('Error', error))
        })

    }

    delete = (id) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM ordinateurs WHERE id = ? ', [id],
                (txObj, resultSet) => {
                    if (resultSet.rowsAffected > 0) {
                        let newList = this.state.data.filter(data => {
                            if (data.id === id)
                                return false
                            else
                                return true
                        })
                        this.setState({ data: newList })
                    }
                })
        })
    }

    async handleChangeOrdinateurName(event) {
        await this.setState({ text: event.target.value });
    }

    render() {


        return (
            <View>
                <Button
                    title="Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <TextInput placeholder="Nom de l'ordinateur" type="text" value={this.state.text} onChange={this.handleChangeOrdinateurName} />
                <Button title="ajout d'ordi" onPress={this.newItem}></Button>

                <ScrollView>
                    {
                        this.state.data && this.state.data.map(data =>
                        (
                            <View key={data.id}>
                                <Text >{data.name}</Text>
                                <TouchableOpacity onPress={() => this.delete(data.id)}>
                                    <Text> DEL </Text>
                                </TouchableOpacity>
                            </View>
                        )
                        )}
                </ScrollView>
                <AddOrdi ordinateurs={this.state.ordinateurs} />

            </View >
        )
    }
}
export default About