import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Note from '@/models/note';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Extend the global namespace
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongoDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Helper function to handle errors
const handleError = (error: unknown, message: string) => {
  console.error(`${message}:`, error);
  return NextResponse.json({ error: message }, { status: 500 });
};

export async function GET() {
  try {
    await connectMongoDB();
    const notes = await Note.find().sort({ timestamp: -1 }).lean();
    return NextResponse.json(notes);
  } catch (error) {
    return handleError(error, 'Failed to fetch notes');
  }
}

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();
    await connectMongoDB();
    const newNote = await Note.create({ name, message });
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return handleError(error, 'Failed to create note');
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await connectMongoDB();
    const result = await Note.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Note deleted' }, { status: 200 });
  } catch (error) {
    return handleError(error, 'Failed to delete note');
  }
}