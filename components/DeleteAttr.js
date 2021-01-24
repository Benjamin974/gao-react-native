import * as React from 'react';
import { View } from 'react-native';
import { Button, } from 'react-native-elements';
import { Dialog, IconButton, Portal } from 'react-native-paper';
import Attribution from '../models/Attributions';
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
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

  delete = async () => {
    console.log(this.props.attribution);
    const add = await Attribution.destroy(this.props.attribution.id)
    this.props.onSelectAttribution(this.props.heure)


    this.setState({
      visible: false
    })

  }


  render() {

    return (
      <View>
        <IconButton icon="delete" color='red' onPress={this.showDialog}> </IconButton>

        <Portal>
          <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
            <Dialog.Title>Enlever l'utilisateur ?</Dialog.Title>
            <Dialog.Content>
              <Button title="Enlever" onPress={this.delete}>ajout d'ordi</Button>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    )
  }
}

export default MyComponent;