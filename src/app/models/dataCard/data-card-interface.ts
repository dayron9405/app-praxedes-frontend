export interface DataCardInterface {
  id: number,
  avatar: {
    isAvatar: boolean;
    img: string;
  },
  title: string;
  subtitle: string;
  imageHead: {
    isImageHead: boolean;
    img: string;
  },
  contentText: {
    isContentText: boolean;
    text: string;
  },
  contentAction: {
    isContentAction: boolean;
    dataAction: object;
  },
  footerAction: {
    isFooterAction: boolean;
    dataAction: object;
  }

}
