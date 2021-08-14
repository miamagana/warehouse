import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  art_id: { type: Number, unique: true, required: true, dropDups: false },
  name: { type: String, required: true },
  stock: { type: Number, default: 0 },
});
