import { format } from 'date-fns';
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface StickyNoteProps {
  note: {
    _id: string;
    name: string;
    message: string;
    timestamp: string;
  };
  onDelete: () => void;
}

export default function StickyNote({ note, onDelete }: StickyNoteProps) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const messageRef = useRef<HTMLParagraphElement>(null);

  const colors = ['bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-pink-200', 'bg-purple-200'];
  const colorIndex = Math.floor(Math.random() * colors.length);
  const backgroundColor = colors[colorIndex];

  useEffect(() => {
    if (messageRef.current) {
      setIsOverflowing(messageRef.current.scrollHeight > messageRef.current.clientHeight);
    }
  }, [note.message]);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete();
    }
  };

  return (
    <div
      className={`${backgroundColor} p-4 rounded-lg shadow-lg transition-all duration-200 relative h-full flex flex-col`}
      onClick={toggleExpand}
    >
      <h3 className="font-bold text-lg mb-2 text-gray-800 truncate">{note.name}</h3>
      <div className={`flex-grow overflow-hidden ${expanded ? 'overflow-y-auto' : ''}`}>
        <p
          ref={messageRef}
          className={`text-gray-700 ${expanded ? '' : 'line-clamp-3'}`}
        >
          {note.message}
        </p>
      </div>
      {!expanded && isOverflowing && (
        <div className="absolute bottom-8 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
      )}
      <p className="text-xs text-gray-500 mt-2">
        {format(new Date(note.timestamp), 'MMM d, yyyy HH:mm')}
      </p>
      <Button
        onClick={handleDelete}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
        size="sm"
      >
        X
      </Button>
    </div>
  );
}