const bodyEmpty = {};

const bodyIsNull = null; 

const bodyDataWithAttachment = {
	"hashid" : "e385bd5c-4a60-4157-b2e6-c638aad30e06",
	"sendDate" : "Fri Oct 28 15:22:18 BRST 2022",
	"from" : {
		"email" : "teste@zenvia.com",
		"name" : "teste@zenvia.com",
		"subject" : "teste"
	},
	"to" : [
		{
			"email" : "teste@zenvia.com",
			"name" : "teste@zenvia.com"
		},
		{
			"email" : "teste@zenvia.com",
			"name" : "teste@zenvia.com"
		}
	],
	"contents" : [
		{
			"type" : "text/html",
			"value" : "Teste"
		}
	],
	"attachment" : {
		"blob" : "https://ststoraged1prod.blob.core.windows.net/treinamentooperaes/attachment/TEMPOASSIST/10102022_99999/RETORNOTESTE.txt"
	},
	"environment": {
        "type": 'AWS'
    }
}

const bodyDataWithoutAttachment = {
	"hashid" : "e385bd5c-4a60-4157-b2e6-c638aad30e06",
	"sendDate" : "Fri Oct 28 15:22:18 BRST 2022",
	"from" : {
		"email" : "teste@zenvia.com",
		"name" : "teste@zenvia.com",
		"subject" : "teste"
	},
	"to" : [
		{
			"email" : "teste@zenvia.com",
			"name" : "teste@zenvia.com"
		}
	],
	"contents" : [
		{
			"type" : "text/html",
			"value" : "Teste"
		}
	],
	"attachment" : {
		"blob" : ""
	}
}

const bodyData = JSON.stringify({
	"hashid" : "e385bd5c-4a60-4157-b2e6-c638aad30e06",
	"sendDate" : "Fri Oct 28 15:22:18 BRST 2022",
	"from" : {
		"email" : "teste@zenvia.com",
		"name" : "teste@zenvia.com",
		"subject" : "teste"
	},
	"to" : [
		{
			"email" : "teste@zenvia.com",
			"name" : "teste@zenvia.com"
		}
	],
	"contents" : [
		{
			"type" : "text/html",
			"value" : "Teste"
		}
	],
	"attachment" : {
		"blob" : ""
	}
});

const responseBodyData = {
	"hashid" : "e385bd5c-4a60-4157-b2e6-c638aad30e06",
	"sendDate" : "Fri Oct 28 15:22:18 BRST 2022",
	"from" : {
		"email" : "teste@zenvia.com",
		"name" : "teste@zenvia.com",
		"subject" : "teste"
	},
	"to" : [
		{
			"email" : "teste@zenvia.com",
			"name" : "teste@zenvia.com"
		}
	],
	"contents" : [
		{
			"type" : "text/html",
			"value" : "Teste"
		}
	],
	"attachment" : {
		"blob" : ""
	}
};

const bodyWithouAttachment = {
	"hashid" : "e385bd5c-4a60-4157-b2e6-c638aad30e06",
	"sendDate" : "Fri Oct 28 15:22:18 BRST 2022",
	"from" : {
		"email" : "teste@zenvia.com",
		"name" : "teste@zenvia.com",
		"subject" : "teste"
	},
	"to" : [
		{
			"email" : "teste@zenvia.com",
			"name" : "teste@zenvia.com"
		}
	],
	"contents" : [
		{
			"type" : "text/html",
			"value" : "Teste"
		}
	]
};

const bodyWithouInvalidBlob = {
	"hashid" : "e385bd5c-4a60-4157-b2e6-c638aad30e06",
	"sendDate" : "Fri Oct 28 15:22:18 BRST 2022",
	"from" : {
		"email" : "teste@zenvia.com",
		"name" : "teste@zenvia.com",
		"subject" : "teste"
	},
	"to" : [
		{
			"email" : "teste@zenvia.com",
			"name" : "teste@zenvia.com"
		}
	],
	"contents" : [
		{
			"type" : "text/html",
			"value" : "Teste"
		}
	],
	"attachment" : {
		"blob" : "uri:127.0.0.1"
	}
};

const invalidBodyData = 'Corpo da Requisição Inválido'

module.exports = {
	bodyDataWithoutAttachment,
	bodyDataWithAttachment,
	bodyEmpty,
    bodyIsNull,
    bodyData,
	responseBodyData,
    invalidBodyData,
	bodyWithouAttachment,
	bodyWithouInvalidBlob
}