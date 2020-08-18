import * as React from 'react';
import {
  Droppable,
  Draggable,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { columnNames, IListData, colors } from '../mocks';
import Card from './Card';

const getListStyle = (isDraggingOver: any, index: number) => ({
  background: isDraggingOver ? colors[index] : '#fff',
  width: '100%',
  minHeight: '100%',
});

const Column = ({
  index,
  style,
  data,
}: {
  index: number;
  style: any;
  data: {
    data: IListData[][];
    ids: string[];
    onMultiSelect: any;
    selected: string[];
    isMoving: boolean;
    dragId: string;
  };
}) => {
  const onClick = (event: any, id: string, sourceId: string) => {
    // already used
    if (event.defaultPrevented) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    // marking the event as used
    event.preventDefault();

    data.onMultiSelect(id, sourceId);
  };
  return (
    <div style={style} className="column">
      <Droppable key={`${data.ids[index]}`} droppableId={`${data.ids[index]}`}>
        {(provided: any, snapshot: any) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver, index)}
          >
            <div className="column-header">
              <span
                className="count"
                style={{ backgroundColor: colors[index] }}
              >
                {data.data[index].length}
              </span>
              <span className="title">{columnNames[index]}</span>
            </div>
            <div className="list-container">
              {data.data[index].map((item, i: number) => (
                <Draggable key={item.id} draggableId={item.id} index={i}>
                  {(prov, snap) => {
                    const isSelected = data.selected.includes(item.id);
                    return (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        onClick={(event) =>
                          onClick(event, item.id, data.ids[index])
                        }
                      >
                        <Card
                          data={item}
                          selected={isSelected}
                          isMoving={data.isMoving}
                          changeColor={data.dragId !== item.id}
                        />
                      </div>
                    );
                  }}
                </Draggable>
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
