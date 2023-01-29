/* eslint-disable max-len */
/* eslint-disable max-lines */
module.exports.objectDataBody = {
  'data': 'Teste',
};

module.exports.stringDataBody = JSON.stringify({
  'data': 'teste',
});

module.exports.attachmentData = {
  'blob': '',
};

module.exports.attachmentIntData = {
  'blob': 1,
};

module.exports.attachmentNullData = {
  'blob': null,
};

module.exports.ccRepeatedEmailArray = [{
  'email': 'teste@teste.com.br',
  'name': 'teste',
}, {
  'email': 'teste@teste.com.br',
  'name': 'teste',
}];

module.exports.ccEmptyEmailArray = [];

module.exports.ccNoNameInEmailArray = [{
  'email': 'teste@teste.com.br',
}];

module.exports.ccNoEmailInEmailArray = [{
  'name': 'teste',
}];

module.exports.ccNumberInNameEmailArray = [{
  'email': 'teste@teste.com.br',
  'name': 10,
}];

module.exports.contentsRepeatedValue = [{
  'type': 'text/html',
  'value': 'teste',
}, {
  'type': 'text/html',
  'value': 'teste',
}];

module.exports.contentsNoValue = [{
  'type': 'text/html',
}];

module.exports.contentsNoType = [{
  'value': 'teste',
}];

module.exports.ccEmptyContents = [];

module.exports.fromEmptyEmailObject = {};

module.exports.fromNoNameInEmailObject = {
  'email': 'teste@teste.com.br',
  'subject': 'teste',
};

module.exports.fromNoEmailInEmailObject = {
  'name': 'teste',
  'subject': 'teste',
};

module.exports.fromNoSubjectInEmailObject = {
  'email': 'teste@teste.com.br',
  'name': 'teste',
};

module.exports.fromObject = {
  'email': 'teste@teste.com.br',
  'name': 'teste',
  'subject': 'teste',
}

module.exports.fromArrayNoObject = [{
  'email': 'teste@teste.com.br',
  'name': 'teste',
  'subject': 'teste',
}];

module.exports.toEmptyEmailArray = [];

module.exports.toNoNameInEmailArray = [{
  'email': 'teste@teste.com.br',
}];

module.exports.toNoEmailInEmailArray = [{
  'name': 'teste',
}];

module.exports.toRepeatedEmailArray = [{
  'email': 'teste@teste.com.br',
  'name': 'teste',
}, {
  'email': 'teste@teste.com.br',
  'name': 'teste',
}];

module.exports.toArray = [{
  'email': 'teste@teste.com.br',
  'name': 'teste',
}];

module.exports.notFoundEnvironment = {};

module.exports.typeNumberEnvironment = {
  "type": 1
};

module.exports.awsEnvironment = {
  "type": 'AWS'
};

module.exports.gcpEnvironment = {
  "type": 'GCP'
};

module.exports.azureEnvironment = {
  "type": 'AZURE'
};
