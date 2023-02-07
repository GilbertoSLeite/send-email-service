class bodyEntity {
	constructor(hashid, sendDate, from, to, contents, attachment, environment) {
	  this.hashid = hashid;
	  this.sendDate = sendDate;
	  this.from = from;
	  this.to = to;
	  this.contents = contents;
	  this.attachment = attachment;
	  this.environment = environment;
	}
  }
  
  module.exports = bodyEntity;