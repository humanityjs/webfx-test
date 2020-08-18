import * as React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { columnNames, IListData, colors } from '../mocks';
import Card from './Card';

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  ...draggableStyle,
  userSelect: 'none',
  background: isDragging ? 'lightgreen' : 'grey',
});

const getListStyle = (isDraggingOver: any, index: number) => ({
  background: isDraggingOver ? colors[index] : '#fff',
  width: '100%',
  height: '100%',
});

const Column = ({
  index,
  style,
  data,
}: {
  index: number;
  style: any;
  data: { data: IListData[][]; ids: string[] };
}) => (
  <div style={style} className="column">
    <Droppable key={index} droppableId={`${data.ids[index]}`}>
      {(provided: any, snapshot: any) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver, index)}
        >
          <div className="column-header">
            <span className="count" style={{ backgroundColor: colors[index] }}>
              {data.data[index].length}
            </span>
            <span className="title">{columnNames[index]}</span>
          </div>
          <div className="list-container">
            {data.data[index].map((item, i: number) => (
              <Draggable key={item.id} draggableId={item.id} index={i}>
                {(prov, snap) => (
                  <div
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    {...prov.dragHandleProps}
                    // style={getItemStyle(
                    //   snap.isDragging,
                    //   prov.draggableProps.style
                    // )}
                  >
                    <Card {...item} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        </div>
      )}
    </Droppable>
  </div>
);

export default Column;
