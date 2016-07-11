// General time-related helpers

var SECS_PER_DAY = 60*60*24;

module.exports = {

    // Returns the current timestamp in milliseconds
    now() {
        return Date.now();
    },

    nowInSeconds() {
        return Math.floor(now() / 1000);
    },

    // Takes a number of days and returns the timestamp for now + number of days
    exp(numDays) {
        return now() + SECS_PER_DAY*numDays;
    },

    // Takes a number of seconds and returns the integer number of days
    days(secs) {
        return secs / SECS_PER_DAY;
    }

}
