var app = require('./config/custom-express')();

app.listen(3001, () => {
    console.log(`Server started on port`);
});