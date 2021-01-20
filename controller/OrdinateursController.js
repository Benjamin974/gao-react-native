import { deleteDatabase } from 'react-native-sqlite-storage'
import Ordinateur from '../Database'

export async function getOrdinateurs() {
  const options = {
    columns: 'id, name',
    order: 'name ASC'
  }
  const data = await Ordinateur.query(options)
  return data;
}

