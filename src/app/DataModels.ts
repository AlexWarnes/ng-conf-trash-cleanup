export interface Position {
  x: number;
  y: number;
}

export type TrashType = 'GLASS' | 'PLASTIC' | 'CHEMICAL';

export interface TrashItem {
  id: string;
  type: TrashType;
  position: Position;
}