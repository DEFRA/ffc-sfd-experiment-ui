const getHtml = (label, labelData, fieldValueData, error) => {
  const fieldValue = fieldValueData?.trim() || ''

  if (label === 'concreteBunkerSize') {
    return !error
      ? `<div class="govuk-character-count" data-module="govuk-character-count" data-maxlength="5">
        <div class="govuk-form-group">
          <label class="govuk-label" for="${label}">
            ${labelData}<span class="govuk-visually-hidden">, in square metres</span>
          </label>
          <div class="govuk-input__wrapper">
            <input class="govuk-input govuk-input--width-5" autocomplete="off" id="${label}" name="${label}" value="${fieldValue}">
            <div class="govuk-input__suffix" aria-hidden="true">m²</div>
          </div>
        </div>
      </div>`
      : `<div class="govuk-character-count" data-module="govuk-character-count" data-maxlength="5">
      <div class="govuk-form-group govuk-form-group--error">
        <label class="govuk-label" for="${label}">
          ${labelData}
        </label>
        <span id="${labelData}-error" class="govuk-error-message">
          <span class="govuk-visually-hidden">
            Error:
          </span>
          ${error}
        </span>
        <div class="govuk-input__wrapper">
          <input class="govuk-input govuk-input--width-4 govuk-input--error" autocomplete="off" id="${label}" name="${label}" value="${fieldValue}">
          <div class="govuk-input__suffix" aria-hidden="true">m²</div>
        </div>
      </div>
    </div>`
  }

  return !error
    ? `<div>
        <label class="govuk-label" for="${label}">
        ${labelData}
        </label>
        <input class="govuk-input govuk-!-width-one-third" id="${label}" name="${label}" value="${fieldValue}">
      </div>`
    : `<div class="govuk-form-group--error">
        <label class="govuk-label" for="${label}">
        ${labelData}
        </label>
        <span id="post-code-error" class="govuk-error-message">
          <span class="govuk-visually-hidden">
            Error:
          </span>
          ${error}
        </span>
        <input class="govuk-input govuk-!-width-one-third govuk-input--error" autocomplete="off" id="${label}" name="${label}" value="${fieldValue}">
      </div>`
}

module.exports = {
  getHtml
}
