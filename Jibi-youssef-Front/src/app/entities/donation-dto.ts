import {CreanceDto} from "./creance-dto";

export interface DonationDto extends CreanceDto {
  nomDonateur: string;
  montant: number;
}
