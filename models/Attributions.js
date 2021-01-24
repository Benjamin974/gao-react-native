import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class Attribution extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('gao-react.db')
  }


  static get tableName() {
    return 'attributions'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      heure: {type: types.NUMERIC, not_null: false},
      user_id: { type: types.INTEGER, not_null: true },
      ordinateur_id: { type: types.INTEGER, not_null: true },
    }
  }
}