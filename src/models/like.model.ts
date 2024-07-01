import mongoose, { Document, Schema } from 'mongoose';
import { ISong } from './song.model';
import { IArtist } from './artist.model';

export interface ILike extends Document {
  userId: string;
  entityType: 'song' | 'artist';
  song?: ISong['_id'];
  artist?: IArtist['_id'];
}

const LikeSchema: Schema = new Schema({
  userId: { type: String, required: true },
  entityType: { type: String, enum: ['song', 'artist'], required: true },
  song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
});

export default mongoose.model<ILike>('Like', LikeSchema);
