import React, { useState } from "react";
import { IFeedProps, IFeedItem } from "./interfaces";
import Card from "./Card";

export default function Feed(props: IFeedProps) {
  return <>{props.items.map((item: IFeedItem) => (
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