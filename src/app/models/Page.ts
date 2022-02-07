export interface Page {
  _id?: any;
  title: string;
  content: string;
}

export interface PageObject {
  pages: Page[];
}
