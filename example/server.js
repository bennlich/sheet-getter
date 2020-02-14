const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { SheetGetter } = require('../SheetGetter.js');

const app = express();
const port = 3000;
app.use(cors());

// Init the SheetGetter object
const creds = JSON.parse(fs.readFileSync('sheet-getter-example-f2cc9e4562d1.json'));
const sheetId = '1mjz4A4RzXN0hHj3Ww-nUOtk-WSrsi9B5-GvA-ZEuAKA';
const mySheetGetter = new SheetGetter(sheetId, creds);

// Store the latest data fetched from the spreadsheet here
const cache = {
  animalInfo: null
};

// Helper function that fetches data from a sheet
async function getAnimalInfo() {
  return mySheetGetter.getSheet('Animals with fraudulent diplomas')
    .then((res) => {
      const rows = res.data.values;
      if (rows.length) {
        // Could do something fancy with rows here (e.g. filter them, parse them, w/e).
        return rows;
      } else {
        console.log('No data found.');
        return [];
      }
    })
    .catch((err) => console.error(err));
}

// Helper function that fetches data from the sheet and drops it in the cache
const fetchLatestData = async () => {
  cache.animalInfo = await getAnimalInfo();
}

// Fetch the latest sheet data on startup
fetchLatestData();

// 
// Routes
// 

// Respond with whatever is in the cache
app.get('/', (req, res) => res.send(cache.animalInfo));

// Update the cache with the latest
app.get('/update', async (req, res) => {
  try {
    await fetchLatestData();
    res.send('Updated!');
  } catch (e) {
    console.error(e);
    res.send(`${e.stack}`);
  }
});

app.listen(port, () => console.log(`Example sheet getter server listening on port ${port}!`));
