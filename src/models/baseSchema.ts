import uuid from "uuid"
import { Schema } from "mongoose"

export interface IBaseSchema {
  _id: string;
}

const BaseSchema = new Schema<IBaseSchema>({
  _id: {
    type: String,
    default: () => uuid.v4(),
  },
})

export default BaseSchema
