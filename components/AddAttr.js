import * as React from 'react';
import { View, Text } from 'react-native';
import { Dialog, IconButton, Portal, Button} from 'react-native-paper';
import Attribution from '../models/Attributions';
import Autocomplete from 'react-native-autocomplete-input';
import User from '../models/Users';
import { TouchableOpacity } from 'react-native-gesture-handler';
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      text: '',
      users: [],
      filteredUsers: [],
      selectedValue: {},
    }
  }


  componentDidMount() {
    this.getClients();
  }

  showDialog = () => {
    this.setState({
      visible: true
    })
  }

  hideDialog = () => {
    this.setState({
      visible: false
    })
  }

  handleChangeInput = (event) => {
    this.setState({
      text: event
    })
  }

  getClients = async () => {
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
      heure: this.props.heure,
      user_id: this.state.selectedValue.id,
      ordinateur_id: this.props.item.id
    }

    const add = await Attribution.create(data)

    const user = await User.find(add.user_id);
    this.props.onSelectAttribution(add, user)

    this.setState({
      visible: false
    })

  }

  findUser = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      let array = []


      array = this.state.users.filter((user) => user.nameUser.search(regex) >= 0)
      this.setState({
        filteredUsers: array
      })
    } else {
      this.setState({
        filteredUsers: []
      })
    }
  };

  render() {

    return (
      <View>
        <IconButton icon="plus" color='green' onPress={this.showDialog}> </IconButton>

        <Portal>
          <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
            <Dialog.Content>
              <View style={{ zIndex: 1, height: 100 }}>
                <Autocomplete
                  autoCapitalize="none"
                  autoCorrect={false}
                  data={this.state.filteredUsers}
                  defaultValue={
                    JSON.stringify(this.state.selectedValue) === '{}' ? '' : this.state.selectedValue.nameUser
                  }
                  onChangeText={(text) => this.findUser(text)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          selectedValue: item
                        })
                        this.setState({
                          filteredUsers: []
                        })
                      }}>
                      <Text style={{ marginBottom: 5 }}>{item.nameUser}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>

              <Button mode='outlined' onPress={this.newItem}>attribuer l'utilisateur</Button>

            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    )
  }
}

export default MyComponent;