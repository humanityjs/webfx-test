import * as React from 'react';
import { IListData } from '../mocks';

interface ICardProps {
  data: IListData;
  isMoving: boolean;
  changeColor: boolean;
  selected?: boolean;
}

export default function Card({
  data,
  selected,
  isMoving,
  changeColor,
}: ICardProps) {
  const { title, description, dueDate, tag } = data;
  return (
    <div
      className={`card ${selected ? 'selected' : ''} ${
        isMoving && changeColor ? 'moving' : ''
      }`}
    >
      <span className="card-title">{title}</span>
      <p className="description">{description}</p>
      <div className="tag">
        <span className="material-icons icon">category</span>
        <span className="tag-value">{tag}</span>
      </div>
      <div className="tag date">
        <span className="material-icons icon">calendar_today</span>
        <span className="tag-value">{dueDate}</span>
      </div>
    </div>
  );
}
