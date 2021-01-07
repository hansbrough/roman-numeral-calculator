import React from 'react';

const Key = ({name, setKey, ...rest}) => {
   return (
     <button {...rest} onClick={() => setKey(name)}>
      {name}
     </button>
   )
};

export default Key;
