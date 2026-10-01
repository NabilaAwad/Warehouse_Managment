const materialService = require("../services/material_service");

const getAllMaterials = async (req, res) => {
  try {
    const materials = await materialService.getAllMaterials();

    res.status(200).json(materials);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get materials",
    });
  }
};

const createMaterial = async (req, res) => {
  try {
    const material = await materialService.createMaterial(req.body);

    res.status(201).json(material);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create material",
    });
  }
};
const updateMaterial = async (req, res) => {
  try {
    const material = await materialService.updateMaterial(req.params.id,req.body);

    res.status(200).json(material);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update material",
    });
  }
};
const deleteMaterial = async (req, res) => {
  try {
    const material = await materialService.deleteMaterial(req.params.id);

    res.status(200).json(material);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete material",
    });
  }
};

module.exports = {
  getAllMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial
};