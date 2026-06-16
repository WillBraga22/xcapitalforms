function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');
  const data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Data de envio',
      'Nome completo',
      'WhatsApp',
      'Cidade/Estado',
      'Participação',
      'Perfil profissional',
      'Faturamento anual',
      'Objetivo principal',
      'Contribuição mensal possível',
      'Prazo para iniciar',
      'Conhecimento sobre consórcio',
      'Melhor horário para contato',
      'Origem do lead'
    ]);
  }

  sheet.appendRow([
    data.dataEnvio || new Date(),
    data.nome || '',
    data.whatsapp || '',
    data.cidadeEstado || '',
    data.participacao || '',
    data.perfil || '',
    data.faturamento || '',
    data.objetivo || '',
    data.contribuicao || '',
    data.prazo || '',
    data.conhecimento || '',
    data.horario || '',
    data.origem || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
