import { ColumnInterface } from '../../../components/Column/columnInterface';

export interface Board {
  title: string;
  id: string;
  columns: ColumnInterface[];
}
