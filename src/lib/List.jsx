import React from 'react';

export default function List({items, selectedItemIndex, onSelect}) {
  return (
    <div className="W95__List">
      <div className="W95__ControlBG" />
      <div className="W95__List__Contents">
        {items.map((item, i) => (
          <div
              onClick={onSelect.bind(this, i)}
              className={`W95__List__ListItem ${i === selectedItemIndex ? 'm-selected' : ''}`}
              key={i}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}