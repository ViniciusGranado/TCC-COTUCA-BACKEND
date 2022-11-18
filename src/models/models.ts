export interface TagRequestAnswer {
  userId: number;
  userTag: string;
  hasPackage: boolean;
  packageDoors?: number[];
}

export interface DoorRequest {
  userId: number;
  size: string;
}

export interface DoorResponse {
  packageId: number;
  doorId: number;
  doorNumber: number;
}