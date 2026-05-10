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
  test.setTimeout(60_000);

  for (const route of routes) {
    const response = await page.goto(route);

    expect(response?.status(), route).toBeLessThan(400);
    await expect(page.locator("body"), route).not.toBeEmpty();
  }
});

test("home start flow enters the console experience", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /INTERACTIVE DOSSIER/i })
  ).toBeVisible();

  await page.getByRole("button", { name: /INICIAR SISTEMA/i }).click();

  await expect(
    page.getByRole("heading", { name: /WPM\.OS/i })
  ).toBeVisible();
  await expect(page.getByText(/Sistema pronto/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /inspecionar projetos/i })).toBeVisible();
});

test("project detail uses optimized media and social image", async ({ page }) => {
  await page.goto("/projects/livro-llm-agentes");

  await expect(
    page.getByRole("heading", { name: /LLMs e Agentes de C[oó]digo/i })
  ).toBeVisible();

  const cover = page.getByRole("img", {
    name: /LLMs e Agentes de C[oó]digo cover/i,
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
    page.getByRole("heading", { name: /ROTA INEXISTENTE/i })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Retornar ao Deck/i })).toBeVisible();
});

test("contact links remain keyboard reachable", async ({ page }) => {
  await page.goto("/contact");

  const backLink = page.getByRole("link", {
    name: /ESC\s+Retornar(?: ao Command Deck)?/i,
  });
  const githubLink = page.getByRole("link", { name: /GitHub/i });

  await tabUntilFocused(page, backLink);
  await tabUntilFocused(page, githubLink);
});

test("SEO metadata is present on tier-1 and tier-2 routes", async ({ page }) => {
  const routes: {
    route: string;
    expectedTitle: string;
    expectedDescription: string;
    canonicalPath: string;
  }[] = [
    // Tier 1
    {
      route: "/projects",
      expectedTitle: "Project Library | WPM.OS - Wallace Phillip Maclayne",
      expectedDescription:
        "Real projects and case studies by Wallace Phillip Maclayne — operational systems, editorial products, and documented results built from real-world constraints.",
      canonicalPath: "/projects",
    },
    {
      route: "/about",
      expectedTitle: "About | WPM.OS - Wallace Phillip Maclayne",
      expectedDescription:
        "Professional profile of Wallace Phillip Maclayne — Commercial Manager, Marketing Technologist, and systems builder combining business, people, and technology from Brazil.",
      canonicalPath: "/about",
    },
    {
      route: "/contact",
      expectedTitle: "Contact | WPM.OS - Wallace Phillip Maclayne",
      expectedDescription:
        "Contact Wallace Phillip Maclayne via public channels — GitHub and LinkedIn. Open for collaboration and professional inquiries.",
      canonicalPath: "/contact",
    },
    // Tier 2
    {
      route: "/skills",
      expectedTitle: "Skill Tree | WPM.OS - Wallace Phillip Maclayne",
      expectedDescription:
        "Skill tree of Wallace Phillip Maclayne — operations, trade marketing, product, UX, web systems, and AI competencies grouped by real project domains.",
      canonicalPath: "/skills",
    },
    {
      route: "/resume",
      expectedTitle: "Career Save | WPM.OS - Wallace Phillip Maclayne",
      expectedDescription:
        "Career timeline of Wallace Phillip Maclayne — commercial operations, trade marketing, customer experience, education, and professional certifications.",
      canonicalPath: "/resume",
    },
    {
      route: "/lab",
      expectedTitle: "Experimental Lab | WPM.OS - Wallace Phillip Maclayne",
      expectedDescription:
        "Experimental lab by Wallace Phillip Maclayne — prototype catalog, interface studies, and creative coding explorations inside the WPM.OS portfolio.",
      canonicalPath: "/lab",
    },
  ];

  for (const { route, expectedTitle, expectedDescription, canonicalPath } of routes) {
    await page.goto(route);

    // Title
    await expect(page).toHaveTitle(expectedTitle);

    // Meta description — exact full-string match prevents false promises
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      expectedDescription
    );
    // secondary: reasonable length
    const descContent = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(descContent!.length).toBeGreaterThan(50);
    expect(descContent!.length).toBeLessThan(300);

    // Canonical — validates path suffix, not just existence
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /.+/);
    const href = await canonical.getAttribute("href");
    expect(href).toContain(canonicalPath);
  }
});

test("mobile uses CSS fallback without WebGL context or heavy chunk", async ({
  page,
}) => {
  // Skip if the test is not running on mobile project
  test.skip(
    !test.info().project.name.includes("mobile"),
    "This guard runs only on mobile-chrome"
  );

  // ── Init: intercept canvas.getContext before any page script ──
  await page.addInitScript(() => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    let webglCalls = 0;

    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      contextId: string,
      ...args: unknown[]
    ) {
      const id = contextId.toLowerCase();
      if (id === "webgl" || id === "webgl2" || id === "experimental-webgl") {
        webglCalls += 1;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (originalGetContext as any).call(this, contextId, ...args);
    };

    (window as unknown as Record<string, unknown>).__webglCallCount = () =>
      webglCalls;
  });

  // ── Navigate, Press Start, wait for console ──
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /INTERACTIVE DOSSIER/i })
  ).toBeVisible();

  await page.getByRole("button", { name: /INICIAR SISTEMA/i }).click();

  // Wait for the console shell to be visible (WPM.OS heading)
  // Wait for the console shell to be visible (Sistema pronto text)
  await expect(page.getByText(/Sistema pronto/i)).toBeVisible();
  // Give a moment for any lazy chunk to potentially load
  await page.waitForTimeout(8000);

  // ── Assertions ──

  // 1. WebGL context guard: mobile must stay on CSS fallbacks only.
  const webglCalls = await page.evaluate(() =>
    Number((window as unknown as Record<string, () => number>).__webglCallCount?.() ?? 0)
  );
  expect(webglCalls).toBe(0);

  // 2. Behavioral lazy-load guard: if the Three/R3F chunk mounted aggressively
  // on mobile, it would request multiple WebGL contexts during this window.
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
