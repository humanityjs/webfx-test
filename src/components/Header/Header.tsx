import * as React from 'react';

import './header.scss';
import { tags } from '../stages/mocks';
import {
  useAppDispatch,
  useAppState,
  actionType,
} from '../../context/app.context';

const ListButton = ({ label }: { label: string }) => {
  const dispatch = useAppDispatch();
  const { filters } = useAppState();
  const selected = filters.includes(label);

  const onSelect = () => {
    if (selected) {
      return dispatch({ type: actionType.REMOVE_FILTER, data: label });
    }

    return dispatch({ type: actionType.ADD_FILTER, data: label });
  };
  return (
    <button onClick={onSelect} className="list-item">
      {selected ? (
        <span className="material-icons icon selected">check_circle</span>
      ) : (
        <span className="material-icons icon">check_circle_outline</span>
      )}
      <span className="label">{label}</span>
    </button>
  );
};

const Filter = () => {
  return (
    <div className="dropdown">
      <ul>
        {tags.map((item) => (
          <li key={item}>
            <ListButton label={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Header() {
  const [showFilter, toggleFilter] = React.useState(false);
  return (
    <div className="container-fluid header">
      <div className="row flex">
        <div className="col-md-4">
          <div className="item-cont">
            <div className="item">
              <span className="material-icons icon">remove_red_eye</span>
              <span>Statuses</span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="flex">
            <div className="item-cont">
              <button
                onClick={() => toggleFilter(!showFilter)}
                className="item"
              >
                <span className="material-icons icon">filter_list</span>
                <span>Filter</span>
              </button>
              {showFilter && <Filter />}
            </div>
            <div className="item-cont">
              <button className="item">
                <span className="material-icons icon">search</span>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
