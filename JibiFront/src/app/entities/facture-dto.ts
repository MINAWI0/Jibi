import {CreanceDto} from "./creance-dto";

export interface FactureDto extends CreanceDto{
  numFacture: number;
  email: string;
}
