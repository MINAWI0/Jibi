import {FactureDto} from "./facture-dto";
import {ImpayeType} from "./enums/ImpayeType";

export interface ImpayeDto{
  id: number,
  montant: number,
  type: ImpayeType,
  date: Date,
  facture: FactureDto
}
