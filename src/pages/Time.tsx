import React from 'react'

import { TIME_ZONE } from 'invariants'

function Months() {
  const renderItem = (item: string, index: number) => {
    return (
      <div className='time-zone'
        key={index}
      >
        {item}
      </div>
    );
  };

  return (
    <section className="times">
      <div style={{ width: '100%', height: '48px' }}></div>
      {TIME_ZONE.map(renderItem)}
    </section>
  );
}



export default Months