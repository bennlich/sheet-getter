A simple example of a node server that uses SheetGetter to fetch data from this sheet: https://docs.google.com/spreadsheets/d/1mjz4A4RzXN0hHj3Ww-nUOtk-WSrsi9B5-GvA-ZEuAKA.

When the server starts up, or when someone hits the `/update` endpoint, the server requests the latest data in the sheet and stores it in memory.

When someone hits the `/` endpoint, the server responds with whatever it last fetched.

### Try out the example

1) Install deps

```
npm install
```

2) Start the node server

```
node server.js
```

3) Visit http://localhost:3000

4) Make a change to https://docs.google.com/spreadsheets/d/1mjz4A4RzXN0hHj3Ww-nUOtk-WSrsi9B5-GvA-ZEuAKA

5) Hit the /update endpoint: http://localhost:3000/update

6) See the updated response: http://localhost:3000

7) It's a simple CMS!