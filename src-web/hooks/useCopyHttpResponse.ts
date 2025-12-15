import type { HttpResponse } from '@yaakapp-internal/models';
import { getModel } from '@yaakapp-internal/models';
import { copyToClipboard } from '../lib/copy';
import { getResponseBodyText } from '../lib/responseBody';
import { useFastMutation } from './useFastMutation';

export function useCopyHttpResponse(response: HttpResponse) {
  return useFastMutation({
    mutationKey: ['copy_http_response', response.id],
    async mutationFn() {
      // 获取最新的 response 数据，避免使用过时的闭包值
      const latestResponse = getModel<'http_response', HttpResponse>('http_response', response.id) ?? response;
      const body = await getResponseBodyText({ response: latestResponse, filter: null });
      copyToClipboard(body);
    },
  });
}
