const Joi = require('joi');
const LENGTH_ARRAY = 1;

module.exports.schema = Joi.object().keys({   
    hashid: Joi.string().guid().required(),
    sendDate: Joi.string().isoDate(),
    attachment: Joi.object({
        'blob': Joi.string().allow('').label('Blob Azure'),
    }),
    from: Joi.object({
        'email': Joi.string().email().required().label('Mail in From'),
        'name': Joi.string().required().label('Name in From'),
        'subject': Joi.string().required().label('Subject in From'),
      }),    
    to: Joi.array().min(LENGTH_ARRAY).items(
        Joi.object({
            'email': Joi.string().email().required().label('Email in To'),
            'name': Joi.string().required().label('Name in To'),
        })).unique('email').label('Email in To'),  
    cc: Joi.array().items(
        Joi.object({
            'email': Joi.string().email().required().label('Email in Carbon Copy'),
            'name': Joi.string().required().label('Name in Carbon Copy'),
        })).unique('email').label('Email in Carbon Copy'),
    contents: Joi.array().items(
        Joi.object({
            'type': Joi.string().required().label('Type in Contents'),
            'value': Joi.string().required().label('Value in Contents'),
        })).unique('value').label('Value in Contents'),
    attachment: Joi.object({
          blob: Joi.string().uri().allow('').required()
        }),
    environment: Joi.object({
        'type': Joi.string().required().valid('AWS', 'GCP', 'AZURE').insensitive().label('Type Environment'),
        }).required().label('Environment'),
});