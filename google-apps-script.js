function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');

    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Data de envio',
        'Nome',
        'WhatsApp',
        'Cidade/Estado',
        'Perfil',
        'Faturamento anual',
        'Objetivo',
        'Contribuição mensal',
        'Prazo para iniciar',
        'Observação',
        'Origem'
      ]);
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.nome || '',
      data.whatsapp || '',
      data.cidade_estado || '',
      data.perfil || '',
      data.faturamento_anual || '',
      data.objetivo || '',
      data.contribuicao_mensal || '',
      data.prazo_inicio || '',
      data.observacao || '',
      data.origem || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
