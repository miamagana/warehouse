import * as mongoose from 'mongoose';

export const ContainArticle = new mongoose.Schema({
  art_id: Number,
  amount_of: Number,
});

export const ProductSchema = new mongoose.Schema({
  name: { type: String, unique: true, dropDups: true },
  contain_articles: [ContainArticle],
});
