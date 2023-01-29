const typeFile = (extensionFile) => {
  const types = {
    'html': 'text/html',
    'json': 'application/json',
    'pdf': 'application/pdf',
    'scv': 'text/csv',
    'txt': 'plain/txt',
  };
  const typeReturn = types[extensionFile];
  return typeReturn;
};

module.exports = typeFile;
