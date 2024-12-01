import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Gift, Check, X, GripVertical } from 'lucide-react';
import type { GiftItem } from '../types';

interface Props {
  gifts: GiftItem[];
  onGiftToggle: (id: string) => void;
  onGiftRemove: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export default function GiftList({ gifts, onGiftToggle, onGiftRemove, onReorder }: Props) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="gifts">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {gifts.map((gift, index) => (
              <Draggable 
                key={gift.id} 
                draggableId={gift.id} 
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border-2 
                      ${gift.purchased ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                  >
                    <span {...provided.dragHandleProps} className="cursor-grab">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                    </span>
                    <Gift className={`w-5 h-5 ${gift.purchased ? 'text-green-500' : 'text-gray-500'}`} />
                    <span className={`flex-grow ${gift.purchased ? 'line-through text-gray-500' : ''}`}>
                      {gift.name}
                    </span>
                    <button
                      onClick={() => onGiftToggle(gift.id)}
                      className={`p-1 rounded-full ${
                        gift.purchased ? 'text-green-600 hover:bg-green-100' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onGiftRemove(gift.id)}
                      className="p-1 rounded-full text-red-600 hover:bg-red-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}