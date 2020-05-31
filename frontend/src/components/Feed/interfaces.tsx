export interface IFeedProps {
  items: IFeedItem[];
  onLike: (item: IFeedItem) => void;
  onDislike: (item: IFeedItem) => void;
  onUpload: (data: FormData) => void;
}

export interface IComment {
  body: string;
  author: string;
  createdAt: string;
}

export interface IFeedItem {
  id: number;
  likesCount: number;
  author: string;
  src: string;
  comments: IComment[];
  createdAt: string;
  likedPost: boolean;
}

export interface ICardProps extends IFeedItem {
  onLike: () => void;
  onDislike: () => void;
}
