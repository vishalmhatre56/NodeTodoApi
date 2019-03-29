const dbName = process.env.DB_NAME;
const port = process.env.PORT
const jwtSecret = process.env.JWT_SECRET
const isMaintanenceModeOn = false;

module.exports = {
    dbName,
    port,
    jwtSecret,
    isMaintanenceModeOn
}