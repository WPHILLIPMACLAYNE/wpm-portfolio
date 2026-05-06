import { expect, test, type Locator, type Page } from "@playwright/test";

const routes = [
  "/",
  "/console",
  "/projects",
  "/projects/wpm-gestao-interna",
  "/projects/livro-llm-agentes",
  "/about",
  "/skills",
  "/resume",
  "/lab",
  "/hobbies",
  "/contact",
  "/robots.txt",
  "/sitemap.xml",
];

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  await page.exposeFunction("__e2eConsoleErrors", () => errors);
});

test.afterEach(async ({ page }, testInfo) => {
  const errors = (await page.evaluate(
    () => window.__e2eConsoleErrors()
  )) as string[];
  const relevantErrors = errors.filter(
    (error) =>
      !(
        testInfo.title === "custom not-found page renders for unknown routes" &&
        error.includes("server responded with a status of 404")
      )
  );

  expect(relevantErrors).toEqual([]);
});

test("critical routes return usable content", async ({ page }) => {
  for (const route of routes) {
    const response = await page.goto(route);

    expect(response?.status(), route).toBeLessThan(400);
    await expect(page.locator("body"), route).not.toBeEmpty();
  }
});

test("home start flow enters the console experience", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Interactive Portfolio System/i })
  ).toBeVisible();

  await page.getByRole("button", { name: /press start/i }).click();

  await expect(
    page.getByRole("heading", { name: /WPM\.OS/i })
  ).toBeVisible();
  await expect(page.getByText(/System ready/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /inspect work/i })).toBeVisible();
});

test("project detail uses optimized media and social image", async ({ page }) => {
  await page.goto("/projects/livro-llm-agentes");

  await expect(
    page.getByRole("heading", { name: /LLMs e Agentes de Codigo/i })
  ).toBeVisible();

  const cover = page.getByRole("img", {
    name: /LLMs e Agentes de Codigo cover/i,
  });
  await expect(cover).toHaveAttribute("src", /project-livro-cover-960\.webp/);

  await expect(page.locator("meta[property='og:image']")).toHaveAttribute(
    "content",
    /project-livro-cover-og\.jpg$/
  );
});

test("custom not-found page renders for unknown routes", async ({ page }) => {
  const response = await page.goto("/missing-route-for-e2e");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: /Route not found/i })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Back to console/i })).toBeVisible();
});

test("contact links remain keyboard reachable", async ({ page }) => {
  await page.goto("/contact");

  const backLink = page.getByRole("link", { name: /back to console/i });
  const githubLink = page.getByRole("link", { name: /contact via github/i });

  await tabUntilFocused(page, backLink);
  await tabUntilFocused(page, githubLink);
});

async function tabUntilFocused(page: Page, target: Locator) {
  for (let i = 0; i < 20; i += 1) {
    await page.keyboard.press("Tab");
    if (
      await target.evaluate((element) => document.activeElement === element)
    ) {
      return;
    }
  }

  await expect(target).toBeFocused();
}

declare global {
  interface Window {
    __e2eConsoleErrors: () => string[];
  }
}
