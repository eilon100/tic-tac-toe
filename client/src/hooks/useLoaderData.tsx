import { useLoaderData as useLoaderDataOriginal } from 'react-router-dom';

interface UseLoaderDataHook {
  <T>(): { data: Promise<T> };
}

const useLoaderData: UseLoaderDataHook = () => {
  const useLoaderDataRef = useLoaderDataOriginal as UseLoaderDataHook;
  return useLoaderDataRef();
};

export default useLoaderData;
