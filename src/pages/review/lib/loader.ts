import ReviewInfoService from '../../../shared/api/services/ReviewService';

export function loaderReviewInfo() {
  return ReviewInfoService.requestReviewInfo();
}
