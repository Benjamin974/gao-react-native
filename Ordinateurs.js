import React, { useCallback } from 'react';
import { View, StyleSheet, Button} from 'react-native';
import Ordinateur from './Database';
import { Card } from 'react-native-elements'
import { Title } from 'react-native-paper';
import AddOrdi from './components/AddOrdi'

class Ordinateurs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ordinateurs: null,
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

  render() {

    return (
      <View style={styles.container}>
        <Button
          title="Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <AddOrdi/>

        <Title> Les ordinateurs</Title>
        {
          this.state.ordinateurs && this.state.ordinateurs.map(data =>
          (
            <Card>
              <Card.Title>{data.name}</Card.Title>
              <Card.Divider />

              <View key={data.id} style={styles.user}>
              </View>

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
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 40,
  },
});