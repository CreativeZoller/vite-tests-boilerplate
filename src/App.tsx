import React, { useState, useEffect } from 'react';
import { Download, GiftIcon } from 'lucide-react';
import { utils, writeFile, WorkSheet } from 'xlsx';
import AddGiftForm from './components/AddGiftForm';
import GiftList from './components/GiftList';
import type { GiftItem } from './types';

function App() {
  const [gifts, setGifts] = useState<GiftItem[]>(() => {
    const saved = localStorage.getItem('christmas-gifts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('christmas-gifts', JSON.stringify(gifts));
  }, [gifts]);

  const handleAddGift = (name: string) => {
    setGifts(prev => [...prev, {
      id: crypto.randomUUID(),
      name,
      purchased: false,
      priority: prev.length
    }]);
  };

  const handleGiftToggle = (id: string) => {
    setGifts(prev => prev.map(gift =>
      gift.id === id ? { ...gift, purchased: !gift.purchased } : gift
    ));
  };

  const handleGiftRemove = (id: string) => {
    setGifts(prev => prev.filter(gift => gift.id !== id));
  };

  const handleReorder = (startIndex: number, endIndex: number) => {
    setGifts(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const exportToExcel = () => {
    // Prepare data with formatted headers and values
    const data = gifts.map(({ id, ...rest }) => ({
      Name: rest.name,
      Purchased: rest.purchased ? 'Yes' : 'No',
      Priority: rest.priority + 1
    }));

    const ws = utils.json_to_sheet(data);

    // Set column widths
    ws['!cols'] = [
      { wch: 30 }, // Name column
      { wch: 15 }, // Purchased column
      { wch: 15 }, // Priority column
    ];

    // Apply custom styles to header row
    const headerStyle = {
      font: { name: 'Roboto', sz: 14, bold: true },
      alignment: { horizontal: 'center' }
    };

    const dataStyle = {
      font: { name: 'Roboto', sz: 11 },
      alignment: { horizontal: 'left' }
    };

    // Apply styles to each cell
    for (let i = 0; i < data.length + 1; i++) {
      const row = i === 0 ? headerStyle : dataStyle;
      const isPurchased = i > 0 && data[i - 1].Purchased === 'Yes';
      
      ['A', 'B', 'C'].forEach(col => {
        const cellRef = `${col}${i + 1}`;
        if (!ws[cellRef]) ws[cellRef] = {};
        ws[cellRef].s = {
          ...row,
          fill: isPurchased ? { fgColor: { rgb: 'E8F5E9' } } : undefined
        };
      });
    }

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Christmas Gifts');
    writeFile(wb, 'christmas-gifts.xlsx');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 text-4xl font-bold text-red-600 mb-2">
            <GiftIcon className="w-10 h-10" />
            <h1 className="main-headline">Christmas Gift List</h1>
          </div>
          <p className="text-gray-600">Keep track of your holiday shopping progress!</p>
        </div>

        <AddGiftForm onAdd={handleAddGift} />

        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="seconary-headline text-xl font-semibold text-gray-800">Your Gifts</h2>
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export to Excel
            </button>
          </div>

          {gifts.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No gifts added yet. Start by adding some gifts above!
            </p>
          ) : (
            <GiftList
              gifts={gifts}
              onGiftToggle={handleGiftToggle}
              onGiftRemove={handleGiftRemove}
              onReorder={handleReorder}
            />
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          Drag and drop gifts to reorder by priority
        </div>
      </div>
    </div>
  );
}

export default App;