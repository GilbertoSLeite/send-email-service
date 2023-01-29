const bodyEntity = (body) => Object.freeze({
    hashid: body.hashid,
	sendDate: body.sendDate,
	from: body.from,
	to: body.to,
	contents: body.contents,
	attachment: body.attachment,
    environment: body.environment
});

module.exports = bodyEntity;