export type Trips = {
  startId: number;
  endId?: number;
  path: [number, number][];
  distance: number;
};
