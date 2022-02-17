export interface Field {
  name: string;
  type: string;
}

export const FIELDS: Field[] = [
  {
    name: 'text',
    type: 'text',
  },
  {
    name: 'textarea',
    type: 'textarea',
  },
];
