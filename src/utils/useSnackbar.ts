import { useSnackbar as useNotistackSnackbar, OptionsObject } from 'notistack';

const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistackSnackbar();

  const showSnackbar = (message: string, options?: OptionsObject) => {
    enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      ...options,
    });
  };

  return { showSnackbar };
};

export default useSnackbar; 
