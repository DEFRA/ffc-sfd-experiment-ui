/**
 * Check the offset of the given element
 * @param  {String}   selector              Element selector
 * @param  {String}   falseCase         Whether to check if the offset matches
 *                                      or not
 * @param  {String}   expectedPosition  The position to check against
 * @param  {String}   axis              The axis to check on (x or y)
 */
export default async (selector, falseCase, expectedPosition, axis) => {
  /**
     * Get the location of the element on the given axis
     * @type {[type]}
     */
  const location = await $(selector).getLocation(axis)

  /**
     * Parsed expected position
     * @type {number}
     */
  const intExpectedPosition = parseFloat(expectedPosition)

  if (falseCase) {
    await expect(location).to.not
      .equal(
        intExpectedPosition,
        `Element "${selector}" should not be positioned at ` +
                `${intExpectedPosition}px on the ${axis} axis`
      )
  } else {
    await expect(location).to
      .equal(
        intExpectedPosition,
        `Element "${selector}" should be positioned at ` +
                `${intExpectedPosition}px on the ${axis} axis, but was found ` +
                `at ${location}px`
      )
  }
}
