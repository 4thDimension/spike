import { Schema } from 'mongoose';

const PropertySchema = new Schema({
  id: Schema.ObjectId,
  houseNo: String,
  Street: String,
  Suburb: String,
  city: String,
  lat: Number,
  long: Number,
  ownerName: String,
  price: Number,
  viewingTimes: [{
    type: Date
  }],
  images: [
    { type: String }
  ],
  description: String,
  maxTenants: Number,

  amenities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Amenity'
    }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  availableDate: Date,
  schools: [
    {
      type: Schema.Types.ObjectId,
      ref: 'School'
    }
  ],
  updated: { type: Date, default: Date.now }

});
export default PropertySchema;

