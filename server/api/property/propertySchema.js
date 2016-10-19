import { Schema } from 'mongoose';

const PropertySchema = new Schema({
  id: Schema.ObjectId,
  houseNo: String,
  Street: String,
  Suburb: String,
  city: String,
  latLon: String,
  ownerName: String,
  amenities: [String],
  ownerType: String,
  AgentCompany: String,
  availableDate: Date,
  ownerRating: Number,
  testimonial: String,
  agreementDate: Date,
  renewalDate: Date,
  tenantId: [Schema.ObjectId]
});
export default PropertySchema;
