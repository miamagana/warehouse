export interface Article extends Document {
  readonly art_id: number;
  readonly name: string;
  stock: number;
}
