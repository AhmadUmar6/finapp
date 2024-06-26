import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Note from '@/models/note';

export async function GET() {
  try {
    await connectMongoDB();
    const notes = await Note.find().sort({ timestamp: -1 });
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();
    await connectMongoDB();
    const newNote = await Note.create({ name, message });
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error('Failed to create note:', error);
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await connectMongoDB();
    await Note.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Note deleted' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete note:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}