import { GoogleSpreadsheet } from "google-spreadsheet"

// Config variables
const SPREADSHEET_ID = process.env.SPREADSHEET_ID
const SHEET_ID = process.env.GOOGLE_SHEET_ID
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const PRIVATE_KEY = String(process.env.GOOGLE_PRIVATE_KEY).replace(/\\n/g, "\n")

const doc = new GoogleSpreadsheet(SPREADSHEET_ID)

export default async function handler(req, res) {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    })
    // loads document properties and worksheets
    await doc.loadInfo()

    const sheet = doc.sheetsById[SHEET_ID]
    // get all raw rows
    const rows = await sheet.getRows()

    const data = rows.map((row) => {
      return {
        name: row._rawData[1],
        progress: row._rawData[7],
      }
    })

    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(data))
  } catch (err) {
    res.statusCode = 500
    res.end(err.toString())
  }
}
