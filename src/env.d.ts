/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly EMAIL_SENDER: string;
  readonly EMAIL_RECEIVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}