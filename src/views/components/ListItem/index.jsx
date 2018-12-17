import React from 'react';

import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ListItem = ({ title, id }) =>
  <Card>
    <CardContent>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
    </CardContent>

    <CardActions>
      <Button size="small" component={Link} to={`/${id}`} color="primary">
        Learn More
      </Button>
    </CardActions>
  </Card>;

export default ListItem;
