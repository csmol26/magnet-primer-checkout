/* eslint-disable @typescript-eslint/no-empty-object-type */
/// <reference types="vite/client" />
import type { CustomElements } from '@primer-io/primer-js/dist/jsx/index';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
}
