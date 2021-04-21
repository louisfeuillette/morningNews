var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

var DB_USERNAME = process.env.DB_USERNAME
var DB_PASSWORD = process.env.DB_PASSWORD
var DB_CLUSTER_NAME = process.env.DB_CLUSTER_NAME

mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER_NAME}/morningnews?retryWrites=true&w=majority`,
    options,
    function(err){
        console.log(err);
    }
)

module.exports = mongoose