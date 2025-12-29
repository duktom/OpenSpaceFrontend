import {
  ApiError,
  BackendDetailedErrorSchema,
  BackendSimplifiedErrorSchema,
} from '@/services/api/types';
import { getErrorMessage } from './get-error-message';

const LOCATION_SEPARATOR = ' -> ';

export const getApiErrorMessages = (error: any): ApiError => {
  const data = error?.response?.data;

  const simple = BackendSimplifiedErrorSchema.safeParse(data);
  if (simple.success) return [simple.data.detail];

  const detailed = BackendDetailedErrorSchema.safeParse(data);
  if (detailed.success) {
    return detailed.data.detail.map((item) => {
      const path = item.loc.join(LOCATION_SEPARATOR);
      const message = item.ctx?.error ? `${item.msg}: ${item.ctx.error}` : item.msg;
      return path ? `${path}: ${message}` : message;
    });
  }

  return [getErrorMessage(error)];
};
