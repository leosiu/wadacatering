//import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';

// Images
import logoDark from 'assets/images/logo-icon-dark.svg';
import logo from 'assets/images/logo.svg';

// ==============================|| LOGO IMAGE ||============================== //

const LogoMain = () => {
  const theme = useTheme();
  return (
      <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Wadabento" width="50" />
  );
};

export default LogoMain;
