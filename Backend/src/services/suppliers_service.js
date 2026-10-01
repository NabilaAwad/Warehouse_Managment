const suppliersModel = require("../models/suppliers_model");

const getAllSuppliers = async () =>{
const suppliers= await suppliersModel.getAllSuppliers();

return suppliers;
}
const createsuppliers = async (data) => {
  const suppliers = await suppliersModel.createSuppliers(data);

  return suppliers;
};
const updatesuppliers = async (data,id) => {
  const suppliers = await suppliersModel.updateSuppliers(id,data);

  return suppliers;
}
const deletesuppliers = async (id) => {
  const suppliers = await suppliersModel.deletesuppliers(id);

  return suppliers;
}

module.exports = {
    getAllSuppliers,
    createsuppliers,
    updatesuppliers,
    deletesuppliers
};