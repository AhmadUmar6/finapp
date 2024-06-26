import mongoose, { Schema, Document } from 'mongoose';

// Interface to define the structure of a Note document
export interface INote extends Document {
  name: string;
  message: string;
  timestamp: Date;
}

// Define the schema
const NoteSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model
export default mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);