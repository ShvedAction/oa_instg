import React, { useState } from "react";
import { IFeedProps, IFeedItem } from "./interfaces";
import Card from "./Card";

export default function Feed(props: IFeedProps) {
  const [items, setItems] = useState(props.items);

  function incLikes(item: IFeedItem) {
    return Object.assign(item, {
      likesCount: item.likesCount + 1
    });
  }
  function decLikes(item: IFeedItem) {
    return Object.assign(item, {
      likesCount: item.likesCount - 1
    });
  }

  return <>{props.items.map((item: IFeedItem) => (
    <Card
      {...item}
      key={item.id}
      onLike={() => {
        setItems(items.map((curr) => (curr.id === item.id) ? incLikes(curr) : curr));
      }}
      onDislike={() => {
        setItems(items.map((curr) => (curr.id === item.id) ? decLikes(curr) : curr))
      }}
    />
  ))}
  </>
}