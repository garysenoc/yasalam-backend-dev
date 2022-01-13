const Visitor = require("../../models/Visitor");


const getVisitor = async (req, res) => {
    // done
    try {
      var populateQuery = [{path:'user', select:'name'}, {path:'branch', select:'name'}, {path:'outlet', select:'name'}];
      const visit = await Visitor.find({user: req.params.id}).populate(populateQuery).sort({ time: "desc"});
      //Tour.findOne({_id=req.params.id})
      return res.status(200).json({
        status: "success",
        data: {
          visit,
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
    getVisitor
  }