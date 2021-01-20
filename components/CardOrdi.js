import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';

class CardOrdi extends React.Component {
  constructor(props) {
    super(props);
    this.state = { attributions: {}, horaires: [], isAttribute: false }

  }



  componentDidMount() {
    this.initialize();
  }
 
  initialize() {
    console.log(this.props.item)
    this.props.item.attributions.forEach(attributions => {
      this.state.attributions[attributions.horaire] = {
        id: attributions.id,
        nom: attributions.client.name,
        prenom: attributions.client.firstname
      }
      console.log(this.state.attributions);
    })
    this.displayHoraire();
  }

  displayHoraire() {
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

  render() {
    const isAttribute = this.state.isAttribute;
    return (

      < Card style={styles.card}>
        <Card.Content>
          <Title style={styles.titleCenter}>{this.props.item.name}</Title>

          <View style={styles.row}>

            <Text style={styles.colTitle}>
              Heure
            </Text>
            <Text style={styles.colTitle}>
              Client
            </Text>
            <Text style={styles.colTitle}>
              Actions
            </Text>
          </View>
          {this.state.horaires.map((item, i) => (
            <View key={i} style={styles.row}>

              <Text style={styles.col}>
                {item.index}
              </Text>
              <Text style={styles.col}>
                {item.attribution.nom}
              </Text>
              <Text style={styles.col}>
                <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')} />
                {/* {item.attribution ? <DeleteAttribution attribution={item.attribution} onSelectAttribution={this.deleteAttribution} ordinateur={this.props.item} horaire={item.index} /> : <AddAttribution onSelectAttribution={this.handleAttribution} date={this.props.date} ordinateur={this.props.item} horaire={item.index} />} */}
              </Text>
            </View>
          ))}

        </Card.Content>
      </Card >)


  }
}


const styles = StyleSheet.create({
  card: {
    flex: 0.2,
    flexDirection: 'column',
    marginTop: '20%',
    marginLeft: '8%',
    marginRight: '8%'
  },

  titleCenter: {
    marginTop: '10px',
    textAlign: 'center',
    marginBottom: '10px',
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '5%'

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

export default CardOrdi;