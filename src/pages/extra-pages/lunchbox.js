import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

const LunchBox = ({ lunchBox, onSelect }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {lunchBox.name}
                </Typography>
                <Typography color="text.secondary">
                    ${lunchBox.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onSelect(lunchBox)}>Select</Button>
            </CardActions>
        </Card>
    );
};

export default LunchBox;
