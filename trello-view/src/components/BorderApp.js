import React from 'react';

export default function BorderApp({id, name, message}) {
  return (
    <div>
      {(() => { 
        if (message !== '') {
          return <div>{message}</div>;
        }
      })()}
      {(() => { 
        if (id !== '' && name != '') {
          return <span>【ID】{id}、【名前】{name}</span>;
        }
      })()}
    </div>
  );
}
