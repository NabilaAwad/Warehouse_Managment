const suppliersService = require("../services/suppliers_service");

const getAllSuppliers = async(req,res) =>{
    try{
      const suppliers = await suppliersService.getAllSuppliers();

      res.status(200).json(suppliers)
    }
    catch(error){
     console.error(error),

     res.status(500).json(
        {message:"Failed to get suppliers"}
     );
    }
}
const createSuppliers = async(req,res) =>{
    try{
      const suppliers = await suppliersService.createsuppliers(req.body);

      res.status(200).json(suppliers)
    }
    catch(error){
     console.error(error),

     res.status(500).json(
        {message:"Failed to create suppliers"}
     );
    }
}
const updateSuppliers = async(req,res) =>{
    try{
      const suppliers = await suppliersService.updatesuppliers(req.params.id,req.body);

      res.status(200).json(suppliers)
    }
    catch(error){
     console.error(error),

     res.status(500).json(
        {message:"Failed to update suppliers"}
     );
    }
}
const deleteSuppliers = async(req,res) =>{
    try{
      const suppliers = await suppliersService.deletesuppliers(req.params.id);

      res.status(200).json(suppliers)
    }
    catch(error){
     console.error(error),

     res.status(500).json(
        {message:"Failed to delete suppliers"}
     );
    }
}
module.exports = {
    getAllSuppliers,
    createSuppliers,
    updateSuppliers,
    deleteSuppliers
}