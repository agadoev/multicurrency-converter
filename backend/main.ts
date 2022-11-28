import express, { Express, Request, Response } from 'express'
import { Currency, Rate, TResponse } from './types'

const app: Express = express()

const port = process.env.PORT || 3000

const getRates = async (): Promise<Record<Currency, Rate>> => {
  const response = await fetch("https://api.apilayer.com/exchangerates_data/latest", {
    headers: {
      apikey: "CwnvFPWnbgjkHocxDkJj3CdBO3eWTPr0"
    }
  });

  if (!response.ok) {
    throw new Error(await response.text())
  }

  const data = await response.json() as TResponse;
  return data.rates;
}

//@ts-ignore
app.get('/rates', async (req: Request, res: Response) => {
  try {

    const rates = await getRates()
    //@ts-ignore
    res.json(rates)
  } catch (e) {
    //@ts-ignore
    res.json(e)
  }
})


//@ts-ignore
app.listen(port, () => {
  console.log(`[server]: Server is listening at https://localhost:${port}`)
})
