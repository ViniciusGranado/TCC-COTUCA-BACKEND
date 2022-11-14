export interface TagRequestDTO {
  userId: number;
  userTag: string;
  hasPackage: boolean;
  packageDoors?: number[];
}
