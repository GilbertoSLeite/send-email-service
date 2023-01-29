const dateFns = require('date-fns');

const today = new Date();

const formatToday = dateFns.format(today, 'yyyy-MM-dd');

module.exports = { formatToday };
