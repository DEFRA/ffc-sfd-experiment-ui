/**
 * Check if the given element is visible inside the current viewport
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Whether to check if the element is visible
 *                              within the current viewport or not
 */
export default async (selector, falseCase) => {
  /**
     * The state of visibility of the given element inside the viewport
     * @type {Boolean}
     */
  const isDisplayed = await $(selector).isDisplayedInViewport()

  if (falseCase) {
    await expect(isDisplayed).to.not
      .equal(
        true,
        `Expected element "${selector}" to be outside the viewport`
      )
  } else {
    await expect(isDisplayed).to
      .equal(
        true,
        `Expected element "${selector}" to be inside the viewport`
      )
  }
}
