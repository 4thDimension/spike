import { Schema } from 'mongoose';

const AmenitySchema = new Schema({
  id: Schema.ObjectId,
  name: String
});
export default AmenitySchema;

