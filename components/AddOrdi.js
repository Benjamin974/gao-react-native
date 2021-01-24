import * as React from 'react';
import { View, TextInput } from 'react-native';
import { Dialog, Portal, Button } from 'react-native-paper';
import Ordinateur from '../models/Ordinateurs';
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
        <Button mode="outlined" icon='plus' color='green' onPress={this.showDialog}> Ajouter un ordinateur</Button>

        <Portal>
          <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
            <Dialog.Content>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={this.handleChangeInput}
                value={this.state.text}
              />
              <Button style={{ marginTop: 30 }} mode='outlined' onPress={this.newItem}>ajouter l'ordinateur</Button>

            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    )
  }
}

export default MyComponent;