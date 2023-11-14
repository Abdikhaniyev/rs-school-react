import { ResourceBase } from './common';

export interface Episode extends ResourceBase {
  air_date: string;
  episode: string;
  characters: string[];
}
