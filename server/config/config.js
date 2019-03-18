const dbName = "TodoApp";
const port = process.env.PORT || 3000;
const jwtSecret = "vish123"
const isMaintanenceModeOn = false;

module.exports = {
    dbName,
    port,
    jwtSecret,
    isMaintanenceModeOn
}