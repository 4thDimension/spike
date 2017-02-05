import { Schema } from 'mongoose';
import db from '../../core/db';
import AmenitySchema from '../amenity/amenity.schema';

const Amenity = db.model('Amenity', AmenitySchema);
const UserSchema = new Schema({
  id: Schema.ObjectId, //TODO: double check if we need this field
  userId: String,
  firstName: String,
  lastName: String,
  type: String,
  photoUrl: String,
  phoneNumber: String,

  // Tenant
  rentingProperty: {
    property: { type: Schema.Types.ObjectId, ref: 'Property' },
    startDate: Date
    //rent is stored in property table if user creates a new property by specifying address
  },
  flatMates: [{
    name: String,
    phoneNumber: String
  }],
  references: [{
    name: String,
    phoneNumber: String
  }],
  identity: {
    type: String,
    number: String
  },
  dob: Date,
  carRegistrationNumber: String,
  employment: {
    type: String, // Self-employed or works for someone
    employerName: String,
    occupation: String,
    income: {
      type: String,
      amount: Number
    },
    contact: {
      address: String,
      name: String,
      phoneNumber: String
    },
    startDate: Date
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  favouriteProperties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Property'
    }
  ],
  searchCriteria: {
    priceMin: Number,
    priceMax: Number,
    roomsMin: Number,
    roomsMax: Number,
    area: String,
    moveInDate: Date,
    pet: Boolean,
    amenities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Amenity'
      }
    ],
    schools: [
      {
        type: Schema.Types.ObjectId,
        ref: 'School'
      }
    ]
  },

  // Landlord/agency
  owningProperties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Property'
    }
  ],
  userType: String,
  agencyName: String,

  updated: { type: Date, default: Date.now },
});
export default UserSchema;
