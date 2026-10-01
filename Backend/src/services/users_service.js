const usersModel = require("../models/users_model");

const getAllUsers = async () =>{
const users= await usersModel.getAllUsers();

return users;
}
const createUsers = async (data) =>{
const users= await usersModel.createusers(data);

return users;
}
const updateUsers = async (id,data) =>{
const users= await usersModel.updateusers(data,id);

return users;
}
const deleteUsers = async (id) =>{
const users= await usersModel.deleteusers(id);

return users;
}

module.exports = {
    getAllUsers,
    createUsers,
    updateUsers,
    deleteUsers
};