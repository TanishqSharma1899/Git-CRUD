var Userdb = require('../modell/model');

//Create and Save New user

exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be Empty!" });
        return;
    }

    //New User
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //Save User in the database
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error Occured While creating a create operation"
            });
        });
}

//retrieve and return all users/ retireve and return a single user

exports.find = (req, res) => {

    if(req.query.id){
     const id = req.query.id;

     Userdb.findById(id)
     .then(data=>{
        if(!data){
            res.status(404).send({message : "Not found user with id"+ id})
        }else{
            res.send(data)
        }
     }) 
     .catch(err=>{
        res.status(500).send({message : "Error Retrieving user with id"+ id})
     })

    }else{
        Userdb.find()
        .then(user=>{
          res.send(user)
        })
        .catch(err=>{
          res.status(500).send({message : err.message || "Error Occurred while retiving user Information"})
        }) 
    }
  
}

//Update a new identified user by user ID

exports.update = (req, res) => {
  if(!req.body){
    return res
    .status(400)
    .send({message : "Data to Update can not be empty"})
  }
  const id=req.params.id;
  Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify: false})
  .then(data=>{
    if(!data){
        res.status(404).send({message : `Cannot Update user with ${id}. Maybe user not found`})
    }else {
        res.send(data)
    }
  }) 
  .catch(err=>{
    res.status(500).send({mesaage : "Error Update user information"});
  });
}

//Delete a user with specified User ID in the request

exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message : `Cannot Delete with id ${id}, Maybe ID is wrong`})
        }else{
            res.send({
                message : "User was Deleted Successfully"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message : "Could not delete User with id ="+ id
        });
    });
}