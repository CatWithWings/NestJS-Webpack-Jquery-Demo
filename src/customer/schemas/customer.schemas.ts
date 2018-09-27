import * as mongoose from 'mongoose';

export const FoodSchema = new mongoose.Schema({
  cnName: String,
  enName: String,
  mainPic: String,
});