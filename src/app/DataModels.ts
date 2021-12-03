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

export interface StorageData {
  storedUnits: number;
  maxUnits: number;
}

export interface BoatStorage {
  PLASTIC: StorageData;
  GLASS: StorageData;
  CHEMICAL: StorageData;
}