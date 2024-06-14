import { initAll } from 'govuk-frontend'
import './application.scss'
import './scripts/cookies'
import { accessibility } from './scripts/accessibility'
import { validation } from './scripts/validation'
import { itemsListChecker } from './scripts/items-list-live-update'

import TimeoutWarning from '../../templates/components/timeout-warning/timeout-warning'
export function nodeListForEach (nodes, callback) {
  if (window.NodeList.prototype.forEach) {
    return nodes.forEach(callback)
  }
  for (let i = 0; i < nodes.length; i++) {
    callback.call(window, nodes[i], i, nodes)
  }
}
window.addEventListener('load', (_event) => {
  accessibility()
  validation()
  itemsListChecker()
})
initAll()
const $timeoutWarnings = document.querySelectorAll('[data-module="govuk-timeout-warning"]')
nodeListForEach($timeoutWarnings, function ($timeoutWarning) {
  new TimeoutWarning($timeoutWarning).init()
})
