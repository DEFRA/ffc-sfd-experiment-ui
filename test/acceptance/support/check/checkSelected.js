/**
 * Check the selected state of the given element
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Whether to check if the element is elected or
 *                              not
 */
export default async (selector, falseCase) => {
  /**
     * The selected state
     * @type {Boolean}
     */
  const isSelected = await $(selector).isSelected()

  if (falseCase) {
    await expect(isSelected).to.not
      .equal(true, `"${selector}" should not be selected`)
  } else {
    await expect(isSelected).to
      .equal(true, `"${selector}" should be selected`)
  }
}
