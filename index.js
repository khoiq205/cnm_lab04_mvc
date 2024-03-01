const express = require('express');
const PORT = 3000;
const app = express();
let courses = require('./data');

//register middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static('./views'));

//config view
app.set('view engine','ejs');
app.set('views','./views');
app.get('/',(req,resp)=>{
    return resp.render('index',{courses})
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
app.post('/save',(req,resp)=>{
const id = Number(req.body.id);
const name = req.body.name;
const course_type = req.body.course_type;
const semester = req.body.semester;
const department = req.body.department;

const params = {
    "id": id,
    "name" : name,
    "course": course_type,
    "semester": semester,
    "department": department
}

courses.push(params);

return resp.redirect('/');
});
 app.post('/delete',(req,resp)=>{
    const listCheckboxSelected = Object.keys(req.body);
    if(listCheckboxSelected <= 0){
        return resp.redirect('/');
    }
    function onDeleteItem(length){
        const maMonHocCanXoa = Number(listCheckboxSelected[length]);
        data = data.filter(item => item.ma != maMonHocCanXoa)
        if(length >0){
            console.log('Data deleted:: ',JSON.stringify(data));
            onDeleteItem(length-1);
        }
    }
 });