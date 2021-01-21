import * as React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
import User from './models/Users';
import { IconButton, List, Title } from 'react-native-paper';
import * as SQLite from 'expo-sqlite'
import { Colors } from 'react-native/Libraries/NewAppScreen';
const db = SQLite.openDatabase('gao-react.db'); // returns Database object


class MyComponent extends React.Component {
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
      columns: 'name, id',
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
      name: this.state.text
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
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={this.handleChangeInput}
          value={this.state.text}
        />
        <Button title="ajout d'utilisateur" onPress={this.newItem}>ajout d'utilisateur</Button>

        <Title> Liste des utilisateurs </Title>
        {
          this.state.users && this.state.users.map(data =>
          (
            <View style={styles.row}>
              <Card.Title>{data.name}</Card.Title>
              <IconButton
                icon="delete"
                color={Colors.red500}
                size={20}
                onPress={() => this.delete(data.id)}
              />
              <View key={data.id} style={styles.user}>
              </View>

            </View>
          )
          )
        }
      </View>
    )
  }
}

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },

  titleCenter: {
    marginTop: '10px',
    textAlign: 'center',
    marginBottom: '10px',
  },

  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

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
  }
});