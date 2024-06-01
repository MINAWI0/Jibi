import {DocumentDto} from "./document-dto";

export interface AgentDto {
  cin: string;
  passeport: string;
  dateNaissance: Date;
  adresse: string;
  email: string;
  numTel: string;
  numCommerce: string;
  numPatente: string;
  nom: string;
  prenom: string;
  username: string;
  password: string;
  documents: DocumentDto[];
  firstLogin: boolean;
}
