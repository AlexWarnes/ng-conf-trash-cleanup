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

export interface Donation {
  created_at: number;
  ff: number;
  flair: string;
  is_gift: number;
  message_public: string;
  name: string;
  pounds: string;
  pounds_color: string;
  team_name: string;
}
