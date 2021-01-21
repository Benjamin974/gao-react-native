import React, { useCallback } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native';
import Ordinateur from './Database';
import { Card } from 'react-native-elements'
import { Title } from 'react-native-paper';
import AddOrdi from './components/AddOrdi';
import Attribution from './models/Attributions';
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('gao-react.db'); // returns Database object

class Ordinateurs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ordinateurs: [],
      text: ''
    }
  }

  componentDidMount() {

    this.getDatas();
  }
  async getDatas() {
    let array = []
    await Ordinateur.createTable();
    const options = {
      columns: 'name, id',
      order: 'name ASC'
    }
    const createdOrdinateurs = await Ordinateur.query(options);
    createdOrdinateurs.forEach(ordi => {
      array.push(ordi)
    })
    this.setState({ ordinateurs: array })

  }

  handleOrdi = (ordinateur) => {
    let array = this.state.ordinateurs.slice();
    array.push(ordinateur);
    this.setState({ ordinateurs: array });

  }

  delete = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM ordinateurs WHERE id = ? ', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let newOrdinateurs = this.state.ordinateurs.filter(data => {
              if (data.id === id)
                return false
              else
                return true
            })
            this.setState({ ordinateurs: newOrdinateurs })
          }
        })
    })
  }

  newAttribution = async () => {

    const data = {
      id_user: 1,
      id_ordinateur: 1
    }

    console.log(data);
    // const add = await Attribution.create(data)
    // this.props.onSelectOrdi(add);

    // this.setState({
    //   visible: false
    // })

  }


  render() {

    return (
      <View style={styles.container}>
        <View>
          <Button
            title="Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button title="ajout d'attribution" onPress={this.newAttribution}>ajout d'attribution</Button>

          <AddOrdi onSelectOrdi={this.handleOrdi} ordinateurs={this.state.ordinateurs} text={this.state.text} />
        </View>



        <Title> Les ordinateurs</Title>
        {
          this.state.ordinateurs && this.state.ordinateurs.map(data =>
          (
            <Card>
              <Card.Title>{data.name}</Card.Title>
              <Card.Divider />

              <View key={data.id} style={styles.user}>
              </View>
              <TouchableOpacity onPress={() => this.delete(data.id)}>
                <Text> DEL </Text>
              </TouchableOpacity>
            </Card>
          )
          )
        }


      </View>
    )
  }
}
export default Ordinateurs

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 40,
  },


});