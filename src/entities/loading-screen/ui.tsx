import { Backdrop } from '@mui/material';
import LoaderScreen from '../../shared/ui/loading-screen/loader';

const LoadingScreen = (): React.ReactNode => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => 10001 }} open>
      <LoaderScreen />
    </Backdrop>
  );
};

export default LoadingScreen;
