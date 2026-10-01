const materialModel = require("../models/materials_model");

const getAllMaterials = async () => {
  const materials = await materialModel.getAllMaterials();

  return materials;
};

const createMaterial = async (data) => {
  const material = await materialModel.createMaterial(data);

  return material;
};
const updateMaterial = async (id,data) => {
  const material = await materialModel.updateMaterial(id,data);

  return material;
};
const deleteMaterial = async (id) => {
  const material = await materialModel.deleteMaterial(id);

  return material;
};

module.exports = {
  getAllMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial
};