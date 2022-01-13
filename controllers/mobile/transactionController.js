const Transaction = require("../../models/Transaction");

const getTransaction = async (req, res) => {
    try {
      var populateQuery = [{path:'user', select:'name'}, {path:'branch', select:'name'}, {path:'outlet', select:'name'}];
      console.log(req.params.id)
      const transaction = await Transaction.find({user: req.params.id}).populate(populateQuery).sort({ time: "desc"});
      return res.status(200).json({
        status: "success",
        data: {
          transaction,
        },
      });
    } catch (err) {
      return res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };
  
module.exports = {
    getTransaction
}