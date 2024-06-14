/**
 * Check the content of a cookie against a given value
 * @param  {String}   name          The name of the cookie
 * @param  {String}   falseCase     Whether or not to check if the value matches
 *                                  or not
 * @param  {String}   expectedValue The value to check against
 */
export default async (name, falseCase, expectedValue) => {
  /**
     * The cookie retrieved from the browser object
     * @type {Object}
     */
  const cookie = await browser.getCookies(name)[0]
  await expect(cookie.name).to.equal(
    name,
    `no cookie found with the name "${name}"`
  )

  if (falseCase) {
    await expect(cookie.value).to.not
      .equal(
        expectedValue,
        `expected cookie "${name}" not to have value "${expectedValue}"`
      )
  } else {
    await expect(cookie.value).to
      .equal(
        expectedValue,
        `expected cookie "${name}" to have value "${expectedValue}"` +
                ` but got "${cookie.value}"`
      )
  }
}
