import React, { useState, useRef } from "react";
import { IFeedProps, IFeedItem } from "./interfaces";
import { makeStyles } from '@material-ui/core/styles';
import Card from "./Card";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  upload: {
    position: 'fixed',
    zIndex: 100,
    right: '20px',
    bottom: '20px'
  },
  fab: {
    position: 'relative'
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
    <form className={classes.upload} ref={formRef}>
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