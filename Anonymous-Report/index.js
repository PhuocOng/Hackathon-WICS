const express = require('express')
const Report = require('./models/report')
const app = express()
const methodOverride = require('method-override')
const path = require('path')  //prep to set up that the render() will render files in views folder
// getting-started.js

const mongoose = require('mongoose');

main()   //connect to mongoose databases init
    .then(() => {
        console.log("connection successfully to mongoose")
    })
    .catch(err => {
        console.log(err)
        console.log('Oh no, mongoose Error!');
    });


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/anonymousReport');
  // main() to connect index.js to mongoose databases
}


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))//this sentence make it possible to access req.body
app.use(methodOverride('_method'))


app.get('/reports', async (req,res) => {
    const reports = await Report.find({})
    res.render('index.ejs', {reports});
})

app.get('/reports/new', async(req,res) => {
    res.render('new.ejs')

})

app.get('/reports/:id', async (req,res) => {
    const {id} = req.params;
    const report = await Report.findById(id);
    res.render('report.ejs', {report})
})

app.post('/reports', async (req,res) => {
    const newReport = new Report(req.body);
    await newReport.save();
    res.redirect(`/reports/${newReport._id}`)
})

app.delete('/reports/:id', async (req, res) => { // To delete the product
    const {id} = req.params;
    const deletedProduct = await Report.findByIdAndDelete(id)
    res.redirect('/reports');
})



app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000")
})