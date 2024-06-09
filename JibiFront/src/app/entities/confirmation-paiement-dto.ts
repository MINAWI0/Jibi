import {CreanceDto} from "./creance-dto";
import {ComptePaiementDto} from "./comptePaiement-dto";

export interface ConfirmationPaiementDto {
  id: number;
  montant: number;
  compte: ComptePaiementDto;
  creance: CreanceDto;
  date: string;
}
