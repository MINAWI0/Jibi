import {CreanceDto} from "./creance-dto";

export interface CreancierDto {
  id: number;
  nom: string;
  categorie: string;
  logoURL: string;
  creances: CreanceDto[];
}
