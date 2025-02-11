import { type CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
// import { Labs } from "@shared/api/model/Labs";

interface DataPoint {
  year: number;
  count: number;
}

interface Observation {
  lab: string;
  count: number;
}

interface ReviewStaticData {
  patients_number: number;
  observations_number: number;
  datapoints_number: number;
  datapoints_per_year: DataPoint[];
  observations_per_lab: Observation[];
  age_sex_pyramid_coverage: string;
}

export class ReviewInfoService {
  static requestReviewInfo(): CancelablePromise<ReviewStaticData> {
    return __request(OpenAPI, {
      method: 'GET',
      url: 'http://localhost:3001/review-static'
    });
  }
}
