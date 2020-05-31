import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ICardProps, IComment } from "./interfaces";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Collapse, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    margin: '20px auto'
  },
  img: {
    width: "100%"
  },
  sendComment: {
    position: 'absolute',
    right: 20
  },
  buttons: {
    position: 'relative',
  }
});

export default function MediaCard(props: ICardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    props.onComment(props.id, data)
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia>
          <img src={props.src} className={classes.img} />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Комментарии
          </Typography>
          {props.comments.map((comment: IComment) => (
            <Typography key={comment.createdAt} variant="body2" color="textSecondary" component="p">
              <b>{comment.author}, {comment.createdAt}</b>: {comment.body}
            </Typography>
          ))}
        </CardContent>
      </CardActionArea>
      <form onSubmit={onSubmit}>
        <CardActions className={classes.buttons}>
          <Button size="small" color="primary" onClick={() => {
            if (props.likedPost) {
              props.onDislike();
            } else {
              props.onLike();
            }
          }}>
            {props.likedPost ?
              <FavoriteIcon /> :
              <FavoriteBorderIcon />
            } {props.likesCount}
          </Button>
          <Button size="small" color="primary" onClick={() => setExpanded(!expanded)}>
            Comment
          </Button>
          <Collapse className={classes.sendComment} in={expanded} timeout="auto" unmountOnExit>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Collapse>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <TextField
              id="filled-textarea"
              label="Add comment"
              multiline
              name="comment[body]"
              variant="outlined"
              fullWidth
            />
          </CardContent>
        </Collapse>
      </form>
    </Card>
  );
}