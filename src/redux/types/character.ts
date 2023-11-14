import { ResourceBase } from './common';

export interface CharacterFilter {
  name?: string;
  type?: string;
  species?: string;
  status?: 'Dead' | 'Alive' | 'unknown';
  gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
  page?: number;
}

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character extends ResourceBase {
  status: 'Dead' | 'Alive' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}
