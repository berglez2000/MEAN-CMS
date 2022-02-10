export interface Image {
  _id: string;
  url: string;
  __v: number;
  filename: string;
  checked?: boolean;
}

export interface Images {
  images: Image[];
}
