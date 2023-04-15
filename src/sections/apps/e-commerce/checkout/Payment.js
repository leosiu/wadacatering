import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import {
  Button,
//  FormControl,
  Grid,
  //InputAdornment,
//  RadioGroup,
  List,
  //InputLabel,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
 // TextField,
//  Divider
} from '@mui/material';

// project imports
import AddAddress from './AddAddress';
//import AddressCard from './AddressCard';
import CartDiscount from './CartDiscount';
import OrderComplete from './OrderComplete';
import OrderSummary from './OrderSummery';
//import PaymentCard from './PaymentCard';
//import PaymentOptions from './PaymentOptions';
//import PaymentSelect from './PaymentSelect';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
//import {  setPaymentMethod } from 'store/reducers/cart';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'store';

// assets
//import { LeftOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
//import {LeftOutlined, DeleteOutlined, RightOutlined} from '@ant-design/icons';
//import cvv from 'assets/images/e-commerce/cvv.png';
//import lock from 'assets/images/e-commerce/lock.png';
//import master from 'assets/images/e-commerce/master-card.png';
//import paypalcard from 'assets/images/e-commerce/paypal.png';

const prodImage = require.context('assets/images/e-commerce', true);

// ==============================|| CHECKOUT PAYMENT - MAIN ||============================== //

//const Payment = ({ checkout, onBack, onNext, editAddress }) => {
  const Payment = ({ checkout, onNext, editAddress }) => {
  const dispatch = useDispatch();

//  const [type, setType] = useState('visa');
//  const [payment, setPayment] = useState(checkout.payment.method);
  const [rows, setRows] = useState(checkout.products);
 // const [cards, setCards] = useState(checkout.payment.card);
  const [select, setSelect] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setSelect(null);
  };

  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (checkout.step > 2) {
      setComplete(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRows(checkout.products);
  }, [checkout.products]);

  const completeHandler = () => {
    if (payment === 'card' && (cards === '' || cards === null)) {
      console.log(payment);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Select Payment Card',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    } else {
      onNext();
      setComplete(true);
    }
  };

//  const getImage = (type) => {
//    if (type === 'visa') {
//      return <img src={master} alt="card" />;
//    }
//    if (type === 'mastercard') {
//      return <img src={paypalcard} alt="card" />;
//    }
//    return null;
//  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={8} xl={12}>
        <Stack>
          <MainCard sx={{ mb: 3 }}>
            <CartDiscount />
          </MainCard>
          <MainCard title="Order Summery" sx={{ borderRadius: '4px 4px 0 0', borderBottom: 'none' }} content={false}>
            {rows.map((row, index) => (
              <List
                key={index}
                component="nav"
                sx={{
                  '& .MuiListItemButton-root': {
                    '& .MuiListItemSecondaryAction-root': {
                      alignSelf: 'flex-start',
                      ml: 1,
                      position: 'relative',
                      right: 'auto',
                      top: 'auto',
                      transform: 'none'
                    },
                    '& .MuiListItemAvatar-root': { mr: '7px' },
                    py: 0.5,
                    pl: '15px',
                    pr: '8px'
                  },
                  p: 0
                }}
              >
                <ListItemButton divider>
                  <ListItemAvatar>
                    <Avatar
                      alt="Avatar"
                      size="lg"
                      variant="rounded"
                      color="secondary"
                      type="combined"
                      src={row.image ? prodImage(`./thumbs/${row.image}`) : ''}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        component={Link}
                        to={`/apps/e-commerce/product-details/${row.id}`}
                        target="_blank"
                        variant="subtitle1"
                        color="textPrimary"
                        sx={{ textDecoration: 'none' }}
                      >
                        {row.name}
                      </Typography>
                    }
                    secondary={
                      <Stack spacing={1}>
                        <Typography color="textSecondary">{row.description}</Typography>
                        <Stack direction="row" alignItems="center" spacing={3}>
                          <Typography>${row.offerPrice}</Typography>
                          <Typography color="textSecondary">{row.quantity} items</Typography>
                        </Stack>
                      </Stack>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton size="medium" color="secondary" sx={{ opacity: 0.5, '&:hover': { bgcolor: 'transparent' } }}>
                      <DeleteOutlined style={{ color: 'grey.500' }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItemButton>
              </List>
            ))}
          </MainCard>
          <OrderSummary checkout={checkout} show={false} />
          <form action="http://localhost:4242/create-checkout-session" method="POST">
              <Button type="submit" variant="contained" sx={{ textTransform: 'none', mt: 3 }} onClick={completeHandler} fullWidth>
                Process to Checkout
              </Button>
          </form>
          <OrderComplete open={complete} />
        </Stack>
      </Grid>
      <AddAddress open={open} handleClose={handleClose} address={select} editAddress={editAddress} />
    </Grid>

  );
};

Payment.propTypes = {
  checkout: PropTypes.object,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  editAddress: PropTypes.func
};


export default Payment;
