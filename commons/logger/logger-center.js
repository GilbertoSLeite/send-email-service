const { createLogger, format, transports } = require('winston');
const { combine, json, label, timestamp } = format;

const logger = createLogger({
  format: combine(
    label({ label: 'Zenvia Docs' }),
    timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
        tz: 'America/Sao_Paulo',
      }),
    json(),
  ),
  transports: [new transports.Console({
    level: 'info',
    handleExceptions: true,
  })]
});


const logRequest = (level, request, response) => {
  logger.info({
    level: level,
    request: request,
    response: response,
    client: {
        name: 'Zenvia',
        service: 'Zenvia Docs',
    },
  });
};

module.exports = logRequest;
