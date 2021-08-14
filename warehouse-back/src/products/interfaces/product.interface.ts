import { Document } from 'mongoose';

export interface ContainArticles {
  art_id: number;
  amount_of: number;
}

export interface Product extends Document {
  readonly name: string;
  readonly contain_articles: ContainArticles[];
}
