import { expect, type Locator, type Page } from "@playwright/test";

/**
 * Opens the filtering menu
 * @param page - The page object
 */
export const openFiltering = async (page: Page) => {
  await page.getByTestId("filter-button").click();
  await expect(page.getByTestId("filter-wrapper")).toBeVisible();
};

/**
 * Parses the length value from the trail
 * @param trail - The trail object
 * @param assertionElement - The element to assert on
 * @returns The length value
 */
const parseLengthValue = async (trail: Locator, assertionElement: string) => {
  return parseInt((await trail.getByTestId(assertionElement).textContent()) ?? "", 10);
};

/**
 * Filters the trails by the given response param
 * @param page - The page object
 * @param responseParam - The response param to filter by
 * @param filterBtnId - The id of the filter button
 * @param clearBtnId - The id of the clear button
 * @param assertionElement - The element to assert on
 * @param lengthValue - The length value to filter by
 */
export const filterTrails = async (
  page: Page,
  responseParam: string,
  filterBtnId: string,
  clearBtnId: string,
  assertionElement: string,
  lengthValue: number | undefined = undefined,
) => {
  const filteredResponse = page.waitForResponse(
    (response) => response.url().includes(responseParam) && response.status() === 200,
  );

  const btnFilter = page.getByTestId(filterBtnId);
  await btnFilter.click();
  await expect(btnFilter).toHaveAttribute("aria-pressed", "true");

  await filteredResponse;

  const filteredTrails = await page.getByTestId("article-tile").all();
  filteredTrails.forEach(async (trail: Locator) => {
    await trail.getByTestId(assertionElement).scrollIntoViewIfNeeded();
    await expect(trail.getByTestId(assertionElement)).toBeVisible();

    if (lengthValue) {
      if (responseParam === "length=15plus") {
        expect(await parseLengthValue(trail, assertionElement)).toBeGreaterThanOrEqual(lengthValue);
      } else {
        expect(await parseLengthValue(trail, assertionElement)).toBeLessThanOrEqual(lengthValue);
      }
    }
  });

  await expect(page.getByTestId(clearBtnId)).toBeVisible();
  await page.getByTestId(clearBtnId).click();
  await expect(btnFilter).not.toHaveAttribute("aria-pressed", "true");
};
