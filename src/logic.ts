import { createStore, createEffect, createEvent, sample } from 'effector'
import type { Currency, Rate } from './getRates';
import { empty, removeLast, addOrRemove } from './utils'
import getRates from './getRates';

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
export const convertPageOpened = createEvent()

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

$searchOpened
  .on(openSearchClicked, () => true)

$selectedCurrencies
  .on(currencyToggled,
      (currencies, newCurrency) => addOrRemove(currencies, newCurrency))

$searchOpened
  .on(closeSearchClicked, () => false)
