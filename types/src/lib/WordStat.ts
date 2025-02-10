export interface PhrasesResponse {
  phrases: string[];
}
export interface SendPhraseParams {
  phrase: string;
  iso_code: string;
  period_type: 'daily' | 'weekly';
  period_start: string | null;
  period_end: string | null;
}
