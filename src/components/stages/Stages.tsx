import * as React from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
  DragStart,
} from 'react-beautiful-dnd';
import { todoData, IListData } from './mocks';
import Column from './components/Column';

import './stages.scss';
import { useAppState } from '../../context/app.context';

export default function Stages() {
  const [todo, setTodo] = React.useState<IListData[]>(todoData);
  const [inProgress, setInProgress] = React.useState<IListData[]>([]);
  const [done, setDone] = React.useState<IListData[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [multiSourceId, setSourceId] = React.useState('');
  const [isMoving, setMoving] = React.useState(false);
  const [dragId, setDragId] = React.useState('');

  const { filters, searchString } = useAppState();

  const filterFn = (item: IListData) => {
    return filters.includes(item.tag);
  };

  const searchFilterFn = (item: IListData) => {
    return item.title.toLowerCase().includes(searchString.toLowerCase());
  };

  let filteredTodo = todo;
  let filteredInProgress = inProgress;
  let filteredDone = done;

  if (filters.length) {
    filteredTodo = todo.filter(filterFn);
    filteredInProgress = inProgress.filter(filterFn);
    filteredDone = done.filter(filterFn);
  }

  if (searchString) {
    filteredTodo = filteredTodo.filter(searchFilterFn);
    filteredInProgress = filteredInProgress.filter(searchFilterFn);
    filteredDone = filteredDone.filter(searchFilterFn);
  }

  const onMultiSelect = (selectedId: string, sourceId: string) => {
    if (sourceId !== multiSourceId) {
      setSelected([selectedId]);
      return setSourceId(sourceId);
    }
    const cloned = Array.from(selected);
    const index = cloned.findIndex((item) => item === selectedId);

    if (index >= 0) {
      cloned.splice(index, 1);
    } else {
      cloned.push(selectedId);
    }
    setSelected(cloned);
  };

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
    const selectedIds = Array.from(selected);

    if (!selectedIds.includes(result[startIndex].id)) {
      selectedIds.push(result[startIndex].id);
    }
    for (const item of selectedIds) {
      const itemIndex = result.findIndex((a) => a.id === item);
      const [removed] = result.splice(itemIndex, 1);
      result.splice(endIndex, 0, removed);
    }

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

    const selectedIds = Array.from(selected);

    if (!selectedIds.includes(sourceClone[droppableSource.index].id)) {
      selectedIds.push(sourceClone[droppableSource.index].id);
    }

    for (const item of selectedIds) {
      const itemIndex = sourceClone.findIndex((a) => a.id === item);
      const [removed] = sourceClone.splice(itemIndex, 1);
      destClone.splice(droppableDestination.index, 0, removed);
    }

    const result: { [key: string]: IListData[] } = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const onDragStart = (start: DragStart) => {
    if (!selected.includes(start.draggableId)) {
      setSelected([]);
    }
    setDragId(start.draggableId);
    setMoving(true);
  };

  const onDragEnd = (result: DropResult) => {
    setMoving(false);
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
      setSelected([]);
    }
  };
  return (
    <div className="stages">
      <AutoSizer>
        {({ height, width }) => (
          <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <List
              className="List"
              height={height}
              itemCount={3}
              itemSize={400}
              width={width}
              layout="horizontal"
              itemData={{
                data: [filteredTodo, filteredInProgress, filteredDone],
                ids: Object.values(ids),
                onMultiSelect,
                selected,
                isMoving,
                dragId,
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
