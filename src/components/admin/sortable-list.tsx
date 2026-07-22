'use client';

import React from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableItemProps {
    id: string;
    children: React.ReactNode;
}

export function SortableItem({ id, children }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };

    return (
        <div ref={setNodeRef} style={style} className="flex items-center gap-3 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
            <button
                type="button"
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-zinc-500 hover:text-white p-1 rounded"
            >
                <GripVertical className="h-5 w-5" />
            </button>
            <div className="flex-1">{children}</div>
        </div>
    );
}

interface SortableListProps<T extends { id: string }> {
    items: T[];
    onReorder: (newItems: T[]) => void;
    renderItem: (item: T) => React.ReactNode;
}

export function SortableList<T extends { id: string }>({ items, onReorder, renderItem }: SortableListProps<T>) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            const newArray = arrayMove(items, oldIndex, newIndex);
            onReorder(newArray);
        }
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                    {items.map((item) => (
                        <SortableItem key={item.id} id={item.id}>
                            {renderItem(item)}
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
