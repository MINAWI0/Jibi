import {CreancierDto} from "./creancier-dto";

export interface CreanceDto {
  id: number;
  nom: string;
  description: string;
  creancier: CreancierDto;
}
