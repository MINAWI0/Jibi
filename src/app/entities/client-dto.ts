import {ClientType} from "./enums/client-type";
import {DocumentDto} from "./document-dto";

export interface ClientDto {
  nom: string;
  prenom: string;
  username: string;
  password: string;
  email: string;
  numTel: string;
  clientType: ClientType;
  documents: DocumentDto[];
  firstLogin: boolean;
}
