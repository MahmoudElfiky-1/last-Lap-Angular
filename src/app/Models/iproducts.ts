export interface IProducts {
  id?: string;
  name: string;
  data: {
    price?: number;
    color?: string;
    capacity?: string;
    [key: string]: any;
  };
}
