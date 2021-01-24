import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Button } from 'react-native-paper';
import AddOrdi from '../components/AddOrdi';
import Attribution from '../models/Attributions';
import * as SQLite from 'expo-sqlite'
import CardOrdi from '../components/CardOrdi';
import Ordinateur from '../models/Ordinateurs';
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

  getDatas = async () => {
    await Ordinateur.createTable();
    await Attribution.createTable();

    let array = [];

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM ordinateurs;', null,
        (txObj, { rows }) => {
          for (let i = 0; i < rows.length; i++) {
            let attributions = [];

            let data = {
              id: rows.item(i).id,
              name: rows.item(i).name,
              attributions: attributions
            }
            array.push(data)
          }



          tx.executeSql('SELECT users.nameUser, attributions.id, ordinateurs.name, attributions.heure FROM ordinateurs LEFT OUTER JOIN attributions ON ordinateurs.id = attributions.ordinateur_id LEFT OUTER JOIN users ON attributions.user_id = users.id;', null,
            (txObj, { rows }) => {
              let finalArray = array.slice();
              rows._array.forEach((attribution, i) => {
                finalArray.forEach(ordinateur => {
                  if (attribution.id != null && attribution.name == ordinateur.name) {
                    ordinateur.attributions.push(attribution)
                  }
                })


              })
              this.setState({ ordinateurs: finalArray });

            })



        })

    })

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

  deleteOrdi = (id) => {
   this.getDatas();
  }


  render() {

    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.container}>

          <Title style={{ fontSize: 30, marginBottom: 10, marginTop: 20 }}>
            <Button
              icon='home'
              mode="text"
              onPress={() => this.props.navigation.navigate('Home')}
            >
              Accueil
            </Button>
          </Title>



          <Title style={{ fontSize: 30, marginBottom: 30 }}> Les ordinateurs</Title>
          <AddOrdi onSelectOrdi={this.handleOrdi} ordinateurs={this.state.ordinateurs} text={this.state.text} />
          {
            this.state.ordinateurs.map((data, i) =>
            (
              <View key={i}>
                <CardOrdi onSelectOrdinateur={this.deleteOrdi} item={data} />
              </View>
            )
            )
          }


        </View>
      </ScrollView>
    )
  }
}
export default Ordinateurs

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 40,

  },

  scrollView: {
    height: '100%',
    width: '100%',
    margin: 20,
    alignSelf: 'center',
  },


});