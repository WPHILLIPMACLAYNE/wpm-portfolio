import * as Sentry from "@sentry/nextjs";

const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN || "";
const sentryEnabled =
  process.env.NODE_ENV === "production" && sentryDsn.length > 0;

Sentry.init({
  dsn: sentryDsn,
  environment: process.env.NEXT_PUBLIC_DEPLOY_TARGET || "development",
  tracesSampleRate: 0.1,
  integrations: sentryEnabled
    ? [
        Sentry.replayIntegration({
          blockAllMedia: true,
          maskAllInputs: true,
          maskAllText: true,
        }),
      ]
    : [],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enabled: sentryEnabled,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
