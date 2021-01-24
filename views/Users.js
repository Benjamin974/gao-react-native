import * as React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import User from '../models/Users';
import { Button, IconButton, Title } from 'react-native-paper';
import * as SQLite from 'expo-sqlite'
import { ScrollView } from 'react-native-gesture-handler';
const db = SQLite.openDatabase('gao-react.db'); // returns Database object


class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      users: []
    }
  }

  componentDidMount() {
    this.getDatas();
  }

  handleChangeInput = (event) => {
    this.setState({
      text: event
    })
  }

  async getDatas() {
    let array = []
    await User.createTable();
    const options = {
      columns: 'nameUser, id',
      order: 'id ASC'
    }
    const getUsers = await User.query(options);
    getUsers.forEach(user => {
      array.push(user)
    })
    this.setState({ users: array })

  }

  newItem = async () => {

    const data = {
      nameUser: this.state.text
    }

    const add = await User.create(data)
    let array = this.state.users.slice();
    array.push(add);
    this.setState({ users: array });

  }

  delete = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM users WHERE id = ? ', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let newUsers = this.state.users.filter(data => {
              if (data.id === id)
                return false
              else
                return true
            })
            this.setState({ users: newUsers })
          }
        })
    })
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
          <Card style={{ padding: 30 }}>
            <Title> Ajouter un utilisateur </Title>

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={this.handleChangeInput}
              value={this.state.text}
            />
            <Button style={{ marginTop: 30 }} mode='outlined' icon='plus' color='green' onPress={this.newItem}>ajouter</Button>
          </Card>
          <Title style={{ fontSize: 30, marginBottom: 30, marginTop: 30 }}> Liste des utilisateurs </Title>

          {
            this.state.users && this.state.users.map((data, i) =>
            (
              <Card key={i}>
                <View style={styles.row}>
                  <Card.Title>{data.nameUser}</Card.Title>
                  <IconButton
                    icon="delete"
                    color='red'
                    size={20}
                    onPress={() => this.delete(data.id)}
                  />

                </View>
              </Card>
            )
            )
          }
        </View>
      </ScrollView>
    )
  }
}

export default Users;

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 40,
  },

  titleCenter: {
    marginTop: '10px',
    textAlign: 'center',
    marginBottom: '10px',
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  colTitle: {
    flex: 4,
    flexDirection: 'column',
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '10px',
    marginBottom: '10px',
  },

  col: {
    flex: 4,
    flexDirection: 'column',
    marginLeft: '10px',
    marginRight: '10px'
  },

  scrollView: {
    height: '100%',
    width: '100%',
    margin: 20,
    alignSelf: 'center',
  },
});