import { ReviewInfoService } from '../../../shared';

export function loaderReviewInfo() {
  return ReviewInfoService.requestReviewInfo();
}
