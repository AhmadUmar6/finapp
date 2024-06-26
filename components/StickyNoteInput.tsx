import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface StickyNoteInputProps {
  onAddNote: (note: { name: string; message: string }) => void;
}

export default function StickyNoteInput({ onAddNote }: StickyNoteInputProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && message) {
      onAddNote({ name, message });
      setName('');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/50 rounded-md"
        />
      </div>
      <div className="mb-4">
        <Textarea
          placeholder="Your note (don't make it too long hehe)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full min-h-[100px] bg-white/50 rounded-md"
        />
      </div>
      <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-md">
        Add Note
      </Button>
    </form>
  );
}