const assert = require('assert');
const dateFns = require('date-fns');
const { formatToday } = require("../../date/today-date");

describe('Testing the function that formats dates', () => {
    describe('when formatting the current date', () => {
        it('should return the date in the format YYYY-MM-DD', () => {
            const today = new Date();
            const expectedFormat = dateFns.format(today, 'yyyy-MM-dd');
            assert.strictEqual(formatToday, expectedFormat);
        });
    });
});