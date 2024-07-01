import mongoose, { Document, Schema } from 'mongoose';

export interface IArtist extends Document {
  name: string;
  dateAdded: Date;
}

const ArtistSchema: Schema = new Schema({
  name: { type: String, required: true },
  dateAdded: { type: Date, required: true },
});

export default mongoose.model<IArtist>('Artist', ArtistSchema);
