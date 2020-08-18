import * as React from 'react';
import './header.scss';

const ListButton = () => {
  return (
    <button className="list-item">
      <span className="material-icons icon">check_circle_outline</span>
      <span>Longform</span>
    </button>
  );
};

const Filter = () => {
  return (
    <div className="dropdown">
      <ul>
        <li>
          <ListButton />
        </li>
        <li>
          <ListButton />
        </li>
        <li>
          <ListButton />
        </li>
      </ul>
    </div>
  );
};

export default function Header() {
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
              <button className="item">
                <span className="material-icons icon">filter_list</span>
                <span>Filter</span>
              </button>
              {/* <Filter /> */}
            </div>
            <div className="item-cont">
              <button className="item">
                <span className="material-icons icon">sort</span>
                <span>Sort</span>
              </button>
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
