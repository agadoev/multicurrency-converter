import { createStore, createEffect, createEvent, sample } from 'effector'
import type { Currency, Rate } from './getRates';
import getRates from './getRates';

const LocalStorageKey = 'selected-currencies';

const removeLast = (str: string): string => {
  if (str === '')
    return str

  return str.substring(0, str.length - 1);
}


const saveToLocalStorageFx = createEffect((selectedCurrencies: Currency[]) => {
  localStorage.setItem(LocalStorageKey, JSON.stringify(selectedCurrencies));
})

function loadSelected(): Currency[] {
  const source = localStorage.getItem(LocalStorageKey)

  if (source) {
    return JSON.parse(source)
  }

  return []
}

const loadFromLocalStorageFx = createEffect<void, Currency[]>(() => {
  return loadSelected()
})

export const extract = (
  obj: Record<string, unknown>,
  keys: string[]): Record<string, unknown> => {

  var entries = Object
    .entries(obj)
    .filter(([key, _]) => keys.includes(key))

  return Object.fromEntries(entries)
}

const addOrRemove = <T>(arr: T[], item: T) =>
  arr.includes(item)
    ? arr.filter(i => i !== item)
    : [...arr, item];

/* stores */
export const $currencies = createStore<Currency[]>([])

export const $selectedCurrencies = createStore<Currency[]>([])

export const $rates = createStore<Record<Currency, Rate> | {}>({})

export const $selectedRates = createStore<Record<Currency, Rate> | {}>({})

export const $editedCurrency = createStore<Currency | null>(null);

export const $inputedValue = createStore<string>('');


/* events */
export const convertPageOpened = createEvent<Currency[]>()

export const confirmClicked = createEvent()

export const userComes = createEvent()

export const closeKeyboardClicked = createEvent()

export const keyboardButtonClicked = createEvent<string>()

export const currencyAmountClicked = createEvent<Currency>()

export const backspaceClicked = createEvent()


/* effects */
export const getRatesFx = createEffect<void, Record<Currency, number>>(async () => {
  return await getRates();
})

const selectedCurrenciesApplied = sample({
  clock: loadFromLocalStorageFx.done,
  source: { rates: $rates, selectedCurrencies: $selectedCurrencies },
  fn: ({ rates, selectedCurrencies }) => extract(rates, selectedCurrencies)
})

/* logic */

$editedCurrency
  .on(closeKeyboardClicked, () => null)

$editedCurrency
  .on(currencyAmountClicked, (_, currency) => currency)

$inputedValue
  .on(closeKeyboardClicked, () => '')

$inputedValue
  .on(keyboardButtonClicked, (value, newValue) => value + newValue)

$inputedValue
  .on(backspaceClicked, (value) => removeLast(value))

// OK
$currencies
  .on(getRatesFx.doneData,
    (_, newRates) => [...Object.keys(newRates) as Currency[]])

// OK
$rates
  .on(getRatesFx.doneData,
    (_, rates) => ({ ...rates }))

$rates
  .on(getRatesFx.fail,
    () => ({}))

// OK
sample({
  clock: confirmClicked,
  source: $selectedCurrencies,
  target: saveToLocalStorageFx
})

// OK
sample({
  clock: getRatesFx.done,
  target: loadFromLocalStorageFx
})

// OK
$selectedCurrencies
  .on(loadFromLocalStorageFx.doneData,
    (_, fromLocalStorage) => [...fromLocalStorage])


$selectedRates
  .on(selectedCurrenciesApplied,
    (_, next) => ({ ...next }))
