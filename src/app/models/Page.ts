export interface Page {
  _id?: any;
  title: string;
  content: string;
  slug: string;
}

export interface PageObject {
  pages: Page[];
}
