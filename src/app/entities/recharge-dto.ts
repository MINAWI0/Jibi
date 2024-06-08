import {CreanceDto} from "./creance-dto";

export interface RechargeDto extends CreanceDto {
  montant: number;
  email: string;
}
