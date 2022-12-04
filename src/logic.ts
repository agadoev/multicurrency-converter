import { createStore, createEffect, createEvent, sample } from 'effector'
import type { Currency, Rate } from './getRates';
import getRates from './getRates';

const LocalStorageKey = 'selected-currencies';

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

export const $errorOccured = createStore<boolean>(false)

export const $ratesLoading = createStore<boolean>(false)

export const $keyboardOpened = createStore<boolean>(false)


/* events */
export const currencySelected = createEvent<Currency>();

export const convertPageOpened = createEvent<Currency[]>();

export const confirmClicked = createEvent();

export const userComes = createEvent();

export const openKeyboardClicked = createEvent();

export const closeKeyboardClicked = createEvent();


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

$keyboardOpened
  .on(openKeyboardClicked, () => true)

$keyboardOpened
  .on(closeKeyboardClicked, () => false)

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
$selectedCurrencies
  .on(currencySelected,
    (already, justNow) => addOrRemove<Currency>(already, justNow))

$ratesLoading
  .on(getRatesFx.pending, () => true)

$ratesLoading
  .on(getRatesFx.finally, () => false)

sample({
  clock: currencySelected,
  source: $selectedCurrencies,
  target: saveToLocalStorageFx
})

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
