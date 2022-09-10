import { useEffect, useState } from "react";
import axios from "axios";

export const useApiProgress = (apiPath) => {
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect(() => {
    let requestInterceptor, responseInterceptor;
    const updateApiCallFor = (url, inProgress) => {
      if (url.startsWith(apiPath)) {
        setPendingApiCall(inProgress);
      }
    };
    const registerInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use((request) => {
        const { url } = request;
        updateApiCallFor(url, true);
        return request;
      });
      responseInterceptor = axios.interceptors.response.use(
        (response) => {
          const { url } = response.config;
          updateApiCallFor(url, false);
          return response;
        },
        (error) => {
          const { url } = error.config;
          updateApiCallFor(url, false);
          throw error;
        }
      );
    };
    const unregisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
    registerInterceptors();
    return function unmount() {
      unregisterInterceptors();
    };
  }, [apiPath]);
  return pendingApiCall;
};
