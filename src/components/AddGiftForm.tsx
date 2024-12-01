import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface Props {
  onAdd: (name: string) => void;
}

export default function AddGiftForm({ onAdd }: Props) {
  const [giftName, setGiftName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (giftName.trim()) {
      onAdd(giftName.trim());
      setGiftName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={giftName}
        onChange={(e) => setGiftName(e.target.value)}
        placeholder="Add a gift..."
        className="flex-grow px-4 py-2 rounded-lg border-2 border-red-200 focus:border-red-300 focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
      >
        <PlusCircle className="w-5 h-5" />
        Add Gift
      </button>
    </form>
  );
}