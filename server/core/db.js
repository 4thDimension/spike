// Very basic, Kishore to improve :)

import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/transporter-collection');

export default mongoose;
