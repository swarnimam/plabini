// Couple-supplied eight-column endpoint. Update the existing web-app deployment after editing.
function doPost(data) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rowData = [data.parameter.name, data.parameter.joining, data.parameter.guests, data.parameter.tilak, data.parameter.sangeet, data.parameter.haldi, data.parameter.vivah, data.parameter.message];
  sheet.appendRow(rowData);
  return ContentService.createTextOutput(JSON.stringify({status: "success"})).setMimeType(ContentService.MimeType.JSON);
}
