const usersService = require("../services/users_service");

const getAllUsers = async(req,res) =>{
    try{
      const users = await usersService.getAllUsers();

      res.status(200).json(users)
    }
    catch(error){
     console.error(error),

     res.status(500).json(
        {message:"Failed to get user"}
     );
    }
}
const createUsers = async(req,res) =>{
    try{
      const users = await usersService.createUsers(req.body);

      res.status(200).json(users)
    }
    catch(error){
     console.error(error),

     res.status(500).json(
        {message:"Failed to create user"}
     );
    }
}
const updateUsers = async(req,res) =>{
    try{
      const users = await usersService.updateUsers(req.params.id,req.body);

      res.status(200).json(users)
    }
    catch(error){
     console.error(error),

     res.status(500).json(
        {message:"Failed to update user"}
     );
    }
}
const deleteUsers = async(req,res) =>{
    try{
      const users = await usersService.deleteUsers(req.params.id);

      res.status(200).json(users)
    }
    catch(error){
     console.error(error),

     res.status(500).json(
        {message:"Failed to delete user"}
     );
    }
}
module.exports = {
    getAllUsers,
    createUsers,
    updateUsers,
    deleteUsers
}