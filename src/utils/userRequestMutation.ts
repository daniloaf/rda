import useSWRMutation from 'swr/mutation';
import axios from 'axios';

export default function useRequestMutation<TData>(
  request: any,
  { initialData, ...config }: any = {}
) {
  return useSWRMutation<TData>(
    request && JSON.stringify(request),
    () => axios(request || {}).then((response) => response.data),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        headers: {},
        data: initialData,
      },
    }
  );
}
