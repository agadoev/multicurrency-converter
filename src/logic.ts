import { createStore, createEffect, createEvent, sample } from 'effector'
import type { Currency, Rate } from './getRates';
import getRates from './getRates';



const empty = (value: any) => 
  Object.keys(value).length == 0 ||
  value == null || 
  value == undefined

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

export const $selectedCurrencies = createStore<Currency[]>(['RUB', 'IDR', 'USD'])

export const $rates = createStore<Record<Currency, Rate> | {}>({})

export const $selectedRates = createStore<Record<Currency, Rate> | {}>({})

export const $editedCurrency = createStore<Currency | null>(null);

export const $inputedValue = createStore<string>('')

export const $searchOpened = createStore<boolean>(false)

export const $totalAmountEur = createStore<number>(1)

export const $isKeyboardOpened = createStore<boolean>(false)


/* events */
export const convertPageOpened = createEvent<Currency[]>()

export const userComes = createEvent()

export const closeKeyboardClicked = createEvent()

export const keyboardButtonClicked = createEvent<string>()

export const currencyAmountClicked = createEvent<Currency>()

export const backspaceClicked = createEvent()

export const openSearchClicked = createEvent()

export const closeSearchClicked = createEvent()

export const currencyToggled = createEvent<Currency>();

export const convertClicked = createEvent<[number, number]>() // amount, coef


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
  .on(currencyAmountClicked, (_, currency) => currency)

$isKeyboardOpened
  .on(currencyAmountClicked, () => true)

$isKeyboardOpened
  .on(closeKeyboardClicked, () => false)

$isKeyboardOpened
  .on(convertClicked, () => false)

$inputedValue
  .on(currencyAmountClicked, () => '')

$inputedValue
  .on(closeKeyboardClicked, () => '')

$inputedValue
  .on(keyboardButtonClicked, (value, newValue) => value + newValue)

$inputedValue
  .on(backspaceClicked, (value) => removeLast(value))

$currencies
  .on(getRatesFx.doneData,
    (_, newRates) => [...Object.keys(newRates) as Currency[]])

$rates
  .on(getRatesFx.doneData,
    (_, rates) => ({ ...rates }))

$rates
  .on(getRatesFx.fail,
    () => ({}))

const convertDataCalculated = sample({
  clock: convertClicked,
  source: {
    editedCurrency: $editedCurrency,
    rates: $rates,
    inputedValue: $inputedValue
  },
  filter: ({ rates, editedCurrency}) => !empty(rates) || !empty(editedCurrency)
})

// костыль
const safe = (rates: Record<Currency, number> | {}, currency: Currency | null): number => {
  if (Object.keys(rates).length == 0) {
    return 1
  }

  if (!currency) {
    return 1
  }

  //@ts-ignore
  return rates[currency];
}

$totalAmountEur
  .on(convertDataCalculated,
      (_, { editedCurrency, rates, inputedValue }) => Number(inputedValue) / safe(rates, editedCurrency))

$selectedRates
  .on(selectedCurrenciesApplied,
    (_, next) => ({ ...next }))

$searchOpened
  .on(openSearchClicked, () => true)

$selectedCurrencies
  .on(currencyToggled,
      (currencies, newCurrency) => addOrRemove(currencies, newCurrency))

$searchOpened
  .on(closeSearchClicked, () => false)
