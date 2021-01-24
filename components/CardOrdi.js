import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Card, ListItem } from 'react-native-elements'
import AddAttr from './AddAttr'
import DeleteAttr from './DeleteAttr'
import _ from 'lodash'
import Ordinateur from '../models/Ordinateurs';

class CardOrdi extends React.Component {
  constructor(props) {
    super(props);
    this.state = { attributions: {}, horaires: [], isAttribute: false }
    this.handleAttribution = this.handleAttribution.bind(this)

  }



  componentDidMount() {
    this.initialize();

  }

  initialize = () => {

    if (this.props.item.attributions != undefined) {
      this.props.item.attributions.forEach(attribution => {
        this.state.attributions[attribution.heure] = {
          id: attribution.id,
          nom: attribution.nameUser,
        }

      })
    }
    this.displayHoraire();
  }

  displayHoraire = () => {
    this.state.horaires = [];
    let data = []

    for (let i = 0; i < 10; i++) {
      data.push({
        index: i + 8,
        attribution: (typeof this.state.attributions[i + 8] !== 'undefined') ? this.state.attributions[i + 8] : false
      })
    }
    this.setState({
      horaires: data,
    });



  }

  handleAttribution = (attributionValue, user) => {
    this.state.attributions[attributionValue.heure] = {
      id: attributionValue.id,
      nom: user.nameUser,
    }
    let data = []
    for (let i = 0; i < 10; i++) {
      data.push({
        index: i + 8,
        attribution: (typeof this.state.attributions[i + 8] !== 'undefined') ? this.state.attributions[i + 8] : false
      })
    }
    this.setState({
      horaires: data,
    });

  }

  deleteAttribution = (heure) => {

    _.unset(this.state.attributions, heure)
    this.state.horaires = [];
    let data = []

    for (let i = 0; i < 10; i++) {
      data.push({
        index: i + 8,
        attribution: (typeof this.state.attributions[i + 8] !== 'undefined') ? this.state.attributions[i + 8] : false
      })
    }
    this.setState({
      horaires: data,
    });

  }

  delete = async(id) => {
    const add = await Ordinateur.destroy(id)
    this.props.onSelectOrdinateur(id)

  }
  render() {
    const isAttribute = this.state.isAttribute;
    return (

      <View>
        <Card>
          <IconButton onPress={() => this.delete(this.props.item.id)} icon="delete" color='red' > </IconButton>

          <Card.Title>{this.props.item.name}</Card.Title>
          <Card.Divider />

          {this.state.horaires.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.attribution.nom}</ListItem.Title>
                <ListItem.Subtitle>{item.index}</ListItem.Subtitle>
              </ListItem.Content>
              { item.attribution ? <DeleteAttr ordinateur={this.props.item} attribution={item.attribution} heure={item.index} onSelectAttribution={this.deleteAttribution} /> : <AddAttr onSelectAttribution={this.handleAttribution} item={this.props.item} heure={item.index} />
              }


            </ListItem>
          )
          )}
        </Card>

      </View>
    )


  }
}

export default CardOrdi;