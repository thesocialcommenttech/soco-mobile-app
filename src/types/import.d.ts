declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '@env' {
  export const BACKEND_URL: string;
  export const STATIC_FILE_URL: string;
  export const PORTFOLIO_WEB_HOST: string;
  export const SENTRY_DSN: string;
  export const ENV: 'development' | 'staging' | 'production';
  export const SENTRY_TRACE_SAMPLE_RATE: number;
}
