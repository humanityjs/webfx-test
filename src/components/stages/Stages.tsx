import * as React from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from 'react-beautiful-dnd';
import { todoData, IListData } from './mocks';
import Column from './components/Column';

import './stages.scss';

export default function Stages() {
  const [todo, setTodo] = React.useState<IListData[]>(todoData);
  const [inProgress, setInProgress] = React.useState<IListData[]>([]);
  const [done, setDone] = React.useState<IListData[]>([]);

  const ids = {
    todo: 'todo',
    'in-progress': 'inProgress',
    done: 'done',
  };

  const stateMapping = {
    [ids.todo]: todo,
    [ids['in-progress']]: inProgress,
    [ids.done]: done,
  };

  const setters = {
    [ids.todo]: setTodo,
    [ids['in-progress']]: setInProgress,
    [ids.done]: setDone,
  };

  const reorder = (list: IListData[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (
    source: IListData[],
    destination: IListData[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: { [key: string]: IListData[] } = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        stateMapping[source.droppableId],
        source.index,
        destination.index
      );

      setters[source.droppableId](items);
    } else {
      const res = move(
        stateMapping[source.droppableId],
        stateMapping[destination.droppableId],
        source,
        destination
      );

      setters[source.droppableId](res[source.droppableId]);
      setters[destination.droppableId](res[destination.droppableId]);
    }
  };
  return (
    <div className="stages">
      <AutoSizer>
        {({ height, width }) => (
          <DragDropContext onDragEnd={onDragEnd}>
            <List
              className="List"
              height={height}
              itemCount={3}
              itemSize={400}
              width={width}
              layout="horizontal"
              itemData={{
                data: [todo, inProgress, done],
                ids: Object.values(ids),
              }}
            >
              {Column}
            </List>
          </DragDropContext>
        )}
      </AutoSizer>
    </div>
  );
}
