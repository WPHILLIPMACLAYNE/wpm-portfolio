declare global {
  interface Window {
    __e2eConsoleErrors: () => string[];
  }
}

export {};
