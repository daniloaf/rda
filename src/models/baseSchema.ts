import { v4 as uuid } from 'uuid'
import { Schema } from 'mongoose'

export interface IBaseSchema {
  _id: string
}

const BaseSchema = new Schema<IBaseSchema>({
  _id: {
    type: String,
    default: () => uuid(),
  },
})

export default BaseSchema
