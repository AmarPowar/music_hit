import mongoose, { Document, Schema } from 'mongoose';
import { IArtist } from './artist.model';

export interface ISong extends Document {
  title: string;
  artist: IArtist['_id'];
  dateAdded: Date;
}

const SongSchema: Schema = new Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  dateAdded: { type: Date, required: true },
});

export default mongoose.model<ISong>('Song', SongSchema);
