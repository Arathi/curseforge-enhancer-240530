export default interface SearchParams {
  gameId: number;
  index?: number;
  // classId?: number;
  gameVersion?: GameVersion;
  pageSize?: number;
  sortField?: SortField;
  // categoryIds?: number[];
  gameFlavors?: ModLoader[];
}

export enum SortField {
  Relevancy = 1,
  Popularity = 2,
  LatestUpdate = 3,
  CreationDate = 5,
  TotalDownloads = 6,
  Alphabet = 7,
}

export function parseSortType(sortBy: string): SortField | undefined {
  switch (sortBy) {
    case "relevancy":
      return SortField.Relevancy;
    case "popularity":
      return SortField.Popularity;
    case "latest update":
      return SortField.LatestUpdate;
    case "creation date":
      return SortField.CreationDate;
    case "total downloads":
      return SortField.TotalDownloads;
    case "a-z":
      return SortField.Alphabet;
  }
  return undefined;
}

export enum ModLoader {
  Forge = 1,
  Fabric = 4,
  Quilt = 5,
  NeoForge = 6,
}

export type GameVersion = string;
