function getAttacmentType(type) {
  const types = {
    'html': 'text/html',
    'json': 'application/json',
    'pdf': 'application/pdf',
    'scv': 'text/csv',
    'txt': 'plain/txt',
  };
  const typeReturn = types[type];
  if (typeReturn) {
    return typeReturn;
  }
  throw new Error(`Type of attachment ${type} is not supported`);
}

module.exports = getAttacmentType;
