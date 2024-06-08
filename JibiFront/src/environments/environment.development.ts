import {HttpHeaders} from "@angular/common/http";
import {SessionService} from "../app/components/utils/session/session.service"
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  jsonHttpOptions:  {
    headers: new HttpHeaders({}).set('Authorization', 'Bearer ' + new SessionService().getToken())
  }
};
