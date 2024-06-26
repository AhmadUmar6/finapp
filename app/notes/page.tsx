'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import StickyNote from '@/components/StickyNote';
import StickyNoteInput from '@/components/StickyNoteInput';

interface Note {
  _id: string;
  name: string;
  message: string;
  timestamp: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedNotes = await response.json();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const addNote = async (newNote: { name: string; message: string }) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await loadNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const response = await fetch(`/api/notes?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="fixed inset-0">
        <Image
          src="/FAQs.png"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
        />
      </div>

      <div className="relative z-10 min-h-screen overflow-y-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-12 text-white text-shadow-lg text-center tracking-tight">
            Leave a message for the CowKa wall
          </h1>
          
          <div className="w-full max-w-md mx-auto mb-16">
            <StickyNoteInput onAddNote={addNote} />
          </div>

          <div className="bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {notes.map((note) => (
                <div key={note._id} className="h-64 transform hover:-rotate-1 transition-all duration-200">
                  <StickyNote note={note} onDelete={() => deleteNote(note._id)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}