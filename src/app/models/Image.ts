export interface Image {
  _id: string;
  url: string;
  __v: number;
  checked?: boolean;
}

export interface Images {
  images: Image[];
}
