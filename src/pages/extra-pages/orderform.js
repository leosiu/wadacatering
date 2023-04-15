import { useEffect, useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

// project import
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import ProductCard from 'components/cards/e-commerce/ProductCard';
import ProductEmpty from 'sections/apps/e-commerce/products/ProductEmpty';
import FloatingCart from 'components/cards/e-commerce/FloatingCart';
import useConfig from 'hooks/useConfig';
import { resetCart } from 'store/reducers/cart';
import { openDrawer } from 'store/reducers/menu';
import { useDispatch, useSelector } from 'store';
import { getProducts } from 'store/reducers/product';
//import axios from 'axios';

//import moment from 'moment';
import api from '../../api';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'container' })(({ theme, open, container }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter
    }),
    marginLeft: 0,
    ...(container && {
        [theme.breakpoints.only('lg')]: {
            marginLeft: !open ? -240 : 0
        }
    }),
    [theme.breakpoints.down('lg')]: {
        paddingLeft: 0,
        marginLeft: 0
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter
        }),
        marginLeft: 0
    })
}));



const OrderForm = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return formatter.format(date);
    };


    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    // product data
    const [products, setProducts] = useState([]);
    const cart = useSelector((state) => state.cart);
    const { container } = useConfig();
    const [workDay] = useState(new Date());

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await api.get('/api/lunchboxes', {
                    params: { work_day: workDay.toISOString().split('T')[0] }
                });
                const sortedProducts = response.data.sort((a, b) => new Date(a.workday) - new Date(b.workday));
                console.log(response.data)
                dispatch(getProducts(sortedProducts));
                setProducts(sortedProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [workDay]);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(openDrawer(false));
        if (cart.checkout.step > 2) {
            dispatch(resetCart());
        }
    }, []);

    const groupByWorkday = (products) => {
        return products.reduce((groups, product) => {
            const workday = product.date;
            if (!groups[workday]) {
                groups[workday] = [];
            }
            groups[workday].push(product);
            return groups;
        }, {});
    };

    const groupedProducts = groupByWorkday(products);

    let productResult = <></>;
    if (products && products.length > 0)

    {
        productResult = Object.entries(groupedProducts).map(([workday, workdayProducts], index) => (
            <Grid key={index} item xs={12}>
                <Box sx={{ mt: 3, mb: 2 }}>
                    <h2>Date: {formatDate(workday)}</h2>
                </Box>
                <Grid container spacing={3}>
                    {workdayProducts.map((product) => (
                        <Grid key={product.id} item xs={12} sm={6} md={3}>
                            <ProductCard
                                id={product.id}
                                image={product.image}
                                name={product.chinesename}
                                offer={product.offer}
                                isStock={product.isStock}
                              //  description={product.description}
                                offerPrice={product.amount}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        ));
    } else {
        productResult = (
            <Grid item xs={12} sx={{ mt: 3 }}>
                <ProductEmpty />
            </Grid>
        );
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Main theme={theme} container={container}>
                <Grid container spacing={2.5}>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {isLoading
                                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                    <Grid key={item} item xs={12} sm={6} md={4} lg={4}>
                                        <SkeletonProductPlaceholder />
                                    </Grid>
                                ))
                                : productResult}
                        </Grid>
                    </Grid>
                </Grid>
            </Main>
            <FloatingCart />
        </Box>
    );
};

export default OrderForm;