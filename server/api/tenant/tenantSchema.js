import { Schema } from 'mongoose';

const TenantSchema = new Schema({
  id: Schema.ObjectId,
  name: String
});
export default TenantSchema;
