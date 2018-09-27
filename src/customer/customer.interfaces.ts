import { Document } from 'mongoose';

export interface Foods extends Document {
  readonly cnName: String,
  readonly enName: String,
  readonly mainPic: String,
}