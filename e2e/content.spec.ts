import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hp has correct title and main heading", async ({ page }) => {
    await expect(page).toHaveTitle(/Beskydské túry/);
    await expect(page.getByTestId("hero-title")).toHaveText(/Beskydské túry/i);
  });

  test("hp shows hero subtitle and intro content", async ({ page }) => {
    await expect(page.getByText(/Pěší trasy v Beskydech/i)).toBeVisible();
    await expect(page.getByText(/O čem jsou Beskydské túry/i)).toBeVisible();
    await expect(page.getByText(/Jak to funguje/i)).toBeVisible();
  });

  test("hp primary CTAs navigate to Trasy and O webu", async ({ page }) => {
    await page.getByTestId("trails-link").click();
    await expect(page).toHaveURL(/\/trasy/);

    await page.goto("/");
    await page.getByTestId("all-trails-link").click();
    await expect(page).toHaveURL(/\/trasy/);

    await page.goto("/");
    await page.getByTestId("about-link").click();
    await expect(page).toHaveURL(/\/o-webu/);
  });

  test("navbar links work from any page", async ({ page }) => {
    await page.goto("/trasy");
    await page.getByTestId("navbar").getByRole("link", { name: "Hlavní stránka" }).click();
    await expect(page).toHaveURL("/");

    await page.getByTestId("navbar").getByRole("link", { name: "Trasy" }).click();
    await expect(page).toHaveURL("/trasy");

    await page.getByTestId("navbar").getByRole("link", { name: "O webu" }).click();
    await expect(page).toHaveURL("/o-webu");
  });

  test("logo links to homepage", async ({ page }) => {
    await page.goto("/o-webu");
    await page.getByRole("link", { name: /Beskydské túry - logo/i }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Trails", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/trasy");
  });

  test("Trasy page has title and heading", async ({ page }) => {
    await expect(page).toHaveTitle(/Trasy/);
    await expect(page.getByRole("heading", { name: "Trasy" })).toBeVisible();
  });

  test("route cards link to detail pages", async ({ page }) => {
    const firstRouteLink = page.getByRole("link", { name: /Detail/i }).first();
    const count = await firstRouteLink.count();
    if (count === 0) {
      test.skip();
      return;
    }
    await firstRouteLink.click();
    await expect(page).toHaveURL(/\/trasy\/.+/);
  });
});

test.describe("Trail detail", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/trasy");
  });

  test("back link returns to Trasy list", async ({ page }) => {
    const firstCard = page.getByTestId("article-tile").first();
    await firstCard.click();
    await expect(page).toHaveURL(/\/trasy\/.+/);

    await page.getByRole("link", { name: /Zpět na Trasy/i }).click();
    await expect(page).toHaveURL("/trasy");
  });

  test("article tile shows trail information", async ({ page }) => {
    const firstCard = page.getByTestId("article-tile").first();

    await expect(firstCard.getByTestId("article-tile-trail-type")).toBeVisible();
    await expect(firstCard.getByTestId("article-tile-trail-length")).toBeVisible();
  });

  test("detail page shows description and map section", async ({ page }) => {
    const firstCard = page.getByTestId("article-tile").first();
    await firstCard.click();

    await expect(page.getByRole("heading", { name: "Popis trasy" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Mapa" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Otevřít mapu v Mapy.com" })).toBeVisible();
  });
});

test.describe("About", () => {
  test("O webu page has title and main sections", async ({ page }) => {
    await page.goto("/o-webu");
    await expect(page).toHaveTitle(/O webu/);
    await expect(page.getByRole("heading", { name: "O webu" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "O Beskydských túrách" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "O mně" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Technické řešení" })).toBeVisible();
  });

  test("GitHub link opens in new tab", async ({ page }) => {
    await page.goto("/o-webu");
    const ghLink = page.getByRole("link", { name: /GitHubu/i });
    await expect(ghLink).toHaveAttribute("target", "_blank");
    await expect(ghLink).toHaveAttribute("href", /github\.com/);
  });
});

test.describe("404 / invalid route", () => {
  test("non-existent trasy slug shows not found", async ({ page }) => {
    const res = await page.goto("/trasy/neexistujici-trasa-12345");
    expect(res?.status()).toBe(404);

    await expect(page.getByTestId("not-found-container")).toBeVisible();
    await expect(page.getByTestId("not-found-title")).toHaveText(/Stránka nenalezena/i);
    await expect(page.getByTestId("not-found-description")).toHaveText(
      /Tato stránka nebo trasa nebyla nalezena. ⚠️/i,
    );
    await expect(page.getByTestId("homepage-link")).toHaveAttribute("href", "/");
    await expect(page.getByTestId("trails-link")).toHaveAttribute("href", "/trasy");
  });
});
