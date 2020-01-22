import React, { useState } from 'react';

const defaultState = {
  notesPlaceholder: '',
  attending_msg: '',
  not_attending_msg: ''
};

export const RsvpContext = React.createContext([{}, () => {}]);

export const RsvpContextProvider = ({
  initialState = { ...defaultState },
  children
}) => {
  const [state, setState] = useState(initialState);
  return (
    <RsvpContext.Provider value={[state, setState]}>
      {children}
    </RsvpContext.Provider>
  );
};
