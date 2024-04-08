/* Angular */
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

/* RxJs */
import { Observable } from 'rxjs';

/* Transloco */
import { Translation, TranslocoLoader } from "@jsverse/transloco";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {

  private http: HttpClient = inject(HttpClient);

  getTranslation(lang: string): Observable<Translation> {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }

}
