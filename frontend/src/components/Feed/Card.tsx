import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ICardProps } from "./interfaces";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props: ICardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.src}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Комментарии
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Классная, фотка!
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Жги ещё!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => {
          if (props.likedPost) {
            props.onDislike();
          } else {
            props.onLike();
          }
        }}>
          {props.likedPost ? 
          <FavoriteIcon/> :
          <FavoriteBorderIcon /> 
          } {props.likesCount}
        </Button>
        <Button size="small" color="primary">
          Comment
        </Button>
      </CardActions>
    </Card>
  );
}