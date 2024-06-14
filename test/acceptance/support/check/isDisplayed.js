/**
 * Check if the given element is (not) visible
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Check for a visible or a hidden element
 */
export default async (selector, falseCase) => {
  /**
     * Visible state of the give element
     * @type {String}
     */
  const isDisplayed = await $(selector).isDisplayed()

  if (falseCase) {
    await expect(isDisplayed).to.not
      .equal(true, `Expected element "${selector}" not to be displayed`)
  } else {
    await expect(isDisplayed).to
      .equal(true, `Expected element "${selector}" to be displayed`)
  }
}
