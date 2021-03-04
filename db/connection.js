const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://MovieBookingSystemDB:l7xum0R4P8CjtaGm@cluster0.zxjhb.mongodb.net/MovieSystemDB?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true


}).then(()=> {
    console.log("database connected successfully");
 }).catch((e)=> {
     console.log("database connected unsuccessfull");
 })

