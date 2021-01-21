import * as React from 'react';
import { View, TextInput } from 'react-native';
import { Button, } from 'react-native-elements';
import { Dialog, Portal } from 'react-native-paper';
import Ordinateur from '../Database';

class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      text: '',
    }
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

  newItem = async () => {

    const data = {
      name: this.state.text
    }

    const add = await Ordinateur.create(data)
    this.props.onSelectOrdi(add);

    this.setState({
      visible: false
    })

  }


  render() {


    return (
      <View>
        <Button title="Add ordi" onPress={this.showDialog}></Button>

        <Portal>
          <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
            <Dialog.Title>Ajoute un ordinateur</Dialog.Title>
            <Dialog.Content>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={this.handleChangeInput}
                value={this.state.text}
              />
              <Button title="ajout d'ordi" onPress={this.newItem}>ajout d'ordi</Button>

            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    )
  }
}

export default MyComponent;