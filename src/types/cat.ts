import { Breed } from "./breed";

export type CatCategory = {
  id: number;
  name: string;
};

export type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
  categories?: CatCategory;
};
