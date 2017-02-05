import { Schema } from 'mongoose';

const ReviewSchema = new Schema({
  id: Schema.ObjectId,
  rating: Number,
  testimonial: String
});
export default ReviewSchema;

