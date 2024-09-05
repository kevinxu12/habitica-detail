import * as mongoose from 'mongoose';

// Set strictQuery to silence deprecation warnings.
mongoose.set('strictQuery', true);

export const connectToMongo = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect('mongodb://127.0.0.1:27017/habitica-dev?replicaSet=rs', {});
};

// TODO: Extend to include UUIDs and enums.
const entrySchema = new mongoose.Schema({
  name: String,
  value: Number,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  tags: [String],
});

export const Entry = mongoose.model('Entry', entrySchema);
