// log object could wrap an error for example
// we can add a field "reason" which gives the server reason for the log event, any additional details about the error etc

// basic log structure

/*

{
    level: e.g. ERROR, WARN, EVENT, etc,
    timestamp: 1234567890
    message: String
    context: {
        user: ObjectId,
        data:
    }
}

*/
