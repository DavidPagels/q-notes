import React, { createContext, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';

export const SnackbarContext = createContext();
export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = props => {
  const [snackbarTitle, setSnackbarTitle] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const showSnackbar = (message) => {
    setSnackbarTitle(message);
    setSnackbarOpen(true);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar
      }}
    >
      {props.children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={3000}
        message={snackbarTitle} />
    </SnackbarContext.Provider>
  );
};
