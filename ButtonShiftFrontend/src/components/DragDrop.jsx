import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DragDrop = () => {
  const [tasks, setTasks] = useState({
    todo: [{ id: '1', content: 'First task' }, { id: '2', content: 'Second task' }],
    processing: [],
    completed: [],
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceList = Array.from(tasks[source.droppableId]);
    const destinationList = Array.from(tasks[destination.droppableId]);

    const [movedTask] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        <DroppableColumn title="To-Do" tasks={tasks.todo} droppableId="todo" bgColor="bg-violet-200" />
        <DroppableColumn title="Processing" tasks={tasks.processing} droppableId="processing" bgColor="bg-blue-200" />
        <DroppableColumn title="Completed" tasks={tasks.completed} droppableId="completed" bgColor="bg-green-200" />
      </div>
    </DragDropContext>
  );
};

const DroppableColumn = ({ title, tasks, droppableId, bgColor }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          className={`p-4 rounded-md min-h-[300px] ${bgColor || 'bg-gray-200'}`}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>
          {tasks && tasks.length > 0 ? (
            tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    className="p-2 mb-2 border rounded bg-white shadow-md text-black"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {task.content}
                  </div>
                )}
              </Draggable>
            ))
          ) : (
            <div></div>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DragDrop;
