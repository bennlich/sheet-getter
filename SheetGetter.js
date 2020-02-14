// See https://flaviocopes.com/google-api-authentication/

const { google } = require('googleapis');

class SheetGetter {
  constructor(sheetId, creds) {
    let scopes = [
      'https://www.googleapis.com/auth/spreadsheets.readonly',
      'https://www.googleapis.com/auth/drive.readonly'
    ];
    this.jwt = new google.auth.JWT(creds.client_email, null, creds.private_key, scopes);
    this.sheetId = sheetId;
  }
  getSheet(sheetName) {
    return new Promise((resolve, reject) => {
      const sheets = google.sheets({version: 'v4', auth: this.jwt });
      sheets.spreadsheets.values.get({
        spreadsheetId: this.sheetId,
        range: sheetName
      }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
  getLastModified() {
    return new Promise((resolve, reject) => {
      const drive = google.drive({version: 'v3', auth: this.jwt });
      drive.files.get({
        fileId: this.sheetId,
        fields: 'modifiedTime'
      }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    }); 
  }
}

module.exports = { SheetGetter };
