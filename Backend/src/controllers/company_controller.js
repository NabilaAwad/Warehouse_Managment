const companyService = require("../services/company_service");

const getAllCompany = async(req,res) =>{
    try{
      const company = await companyService.getAllCompany()

      res.status(200).json(company)
    }
    catch(error){
     console.error(error),

     res.status(500).json(
        {message:"Failed to get warehouse"}
     );
    }
}
const createCompany = async (req, res) => {
  try {
    const company = await companyService.createCompany(req.body);

    res.status(201).json(company);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create company",
    });
  }
};
const updateCompany = async (req, res) => {
  try {
    const company = await companyService.updateCompany(req.params.id,req.body);

    res.status(200).json(company);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update company",
    });
  }
};
const deleteCompany = async (req, res) => {
  try {
    const company = await companyService.deleteCompany(req.params.id);

    res.status(200).json(company);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete company",
    });
  }
};
module.exports = {
    getAllCompany,
    createCompany,
    updateCompany,
    deleteCompany
}