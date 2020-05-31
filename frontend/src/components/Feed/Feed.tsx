import React, { useRef } from "react";
import { IFeedProps, IFeedItem } from "./interfaces";
import { makeStyles } from '@material-ui/core/styles';
import Card from "./Card";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
  controls: {
    position: 'fixed',
    zIndex: 100,
    right: 20,
    bottom: 20
  },
  fab: {
    position: 'relative',
    margin: 10
  },
  input: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0,
    cursor: 'pointer'
  }
});

export default function Feed(props: IFeedProps) {
  const classes = useStyles();
  const formRef = useRef<HTMLFormElement>(null);

  return <>
    <div className={classes.controls} >
        <Fab color="primary" onClick={props.onLogout} className={classes.fab}>
          <ExitToAppIcon />
        </Fab>
      <form ref={formRef}>
        <Fab color="primary" aria-label="add" type="submit" className={classes.fab}>
          <input
            accept="image/png,image/gif,image/jpeg"
            type="file" name="post[src]"
            className={classes.input}
            onChange={() => {
              props.onUpload(new FormData(formRef.current!))
            }}
          />
          <AddIcon />
        </Fab>
      </form>
    </div>
    {props.items.map((item: IFeedItem) => (
      <Card
        {...item}
        key={item.id}
        onLike={() => {
          props.onLike(item);
        }}
        onDislike={() => {
          props.onDislike(item);
        }}
      />
    ))}
  </>
}