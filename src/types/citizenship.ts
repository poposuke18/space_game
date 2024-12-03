// src/types/citizenship.ts

export type CitizenshipStatus = 'CIVILIAN' | 'TRAINEE' | 'CITIZEN';

export type CitizenshipRequirement = {
  id: string;
  name: string;
  description: string;
  completed: boolean;
};

export type Citizen = {
  id: string;
  name: string;
  status: CitizenshipStatus;
  militaryService: {
    started: boolean;
    completed: boolean;
    yearsServed: number;
  };
  requirements: CitizenshipRequirement[];
  votingRights: boolean;
  contributions: {
    military: number;
    civil: number;
    research: number;
  };
};

export type CitizenshipStats = {
  totalPopulation: number;
  citizens: number;
  trainees: number;
  civilians: number;
};