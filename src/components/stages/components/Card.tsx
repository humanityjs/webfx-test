import * as React from 'react';
import { IListData } from '../mocks';

export default function Card({ title, description, dueDate, tag }: IListData) {
  return (
    <div className="card">
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
