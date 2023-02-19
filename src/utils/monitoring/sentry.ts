import {
  SENTRY_DSN,
  ENV,
  SENTRY_TRACE_SAMPLE_RATE as SENTRY_TRACES_SAMPLE_RATE,
  BACKEND_URL
} from '@env';
import * as Sentry from '@sentry/react-native';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

export const addAxiosErrorDataBreadcrumb = (error: AxiosError) => {
  if (!axios.isAxiosError(error)) {
    return;
  }

  Sentry.addBreadcrumb({
    category: 'axios.error',
    message: error.message,
    data: {
      response: {
        headers: error.response.headers,
        body: error.response.data,
        status: error.response.status
      },
      request: error.request
    },
    level: 'error'
  });
};

Sentry.init({
  dsn: SENTRY_DSN,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE,
  // enabled: ENV !== 'development',
  environment: ENV,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      tracingOrigins: ['localhost', BACKEND_URL, /^\//]
    })
  ],
  enableAutoPerformanceTracking: true
});
