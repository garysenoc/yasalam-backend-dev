const UserOutlet = require('./../../models/UserOutlet')
const Outlet = require('./../../models/Outlet')
const Branch = require('./../../models/Branch')
const Visitor = require('./../../models/Visitor')
const Transaction = require('./../../models/Transaction')
const catchAsync = require("../../utils/catchAsync");

//top 5 newest outlet 
const topNewestOutlet = async (req, res) => {
  var populateQuery = [{path:'category', select:'name'}, {path:'feature', select:'name'}];
    try {
      const outlet = await Outlet.find().select("-password").populate(populateQuery).sort({ _id: -1 }).limit(5)
  
      res.status(200).json({
        status: "success",
        results: outlet.length,
        data: {
          outlet,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

  //live tracker with all outlet  
 
const outletLiveTracker= catchAsync(async (req, res, next) => {
  var populateQuery = [{path:'category', select:'name'}, {path:'feature', select:'name'}];

  let outlet = await Outlet.find().select("-password").populate(populateQuery)

  for(i in outlet){
    outlet[i] = {...outlet[i]._doc}
  }

  let outletIDs = []

  for(let i in outlet){
      outletIDs.push(outlet[i]._id)
  }

  let count = 0;
  const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Dubai' })

  const day = new Date(currentDate).getDate().toString()
  const month = new Date(currentDate).getMonth().toString()
  const year = new Date(currentDate).getFullYear().toString()


  for(let i in outletIDs){
      count = await Visitor.count({outlet:outletIDs[i],day:day,month:month,year:year})
      outlet[i] =  {...outlet[i], totalDayVisitor:count}
  }

  res.status(200).json({
    status: "success",
    data: {
    outlet
    },
  });
})



const outletSingleLiveTracker= catchAsync(async (req, res, next) => {
  var populateQuery = [{path:'category', select:'name'}, {path:'feature', select:'name'}];

  let outlet = await Outlet.findById(req.params.id).select("-password").populate(populateQuery)

  
  let count = 0;
  const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Dubai' })


  const day = new Date(currentDate).getDate().toString()
  const month = new Date(currentDate).getMonth().toString()
  const year = new Date(currentDate).getFullYear().toString()

  
  count = await Visitor.count({outlet:outlet._id,day:day,month:month,year:year})


  outlet=  {...outlet._doc, totalDayVisitor:count}

  
  let branch = await Branch.find({outlet:outlet._id}).select("-password")

  let branchIDs = [];


  for(let i in branch) {
    branchIDs.push(branch[i].id)
  }
console.log(branchIDs)
  for(let i in branchIDs){
    count = 0
      count = await Visitor.count({branch:branchIDs[i],day:day,month:month,year:year,isBranch:true})
      branch[i] =  {...branch[i]._doc, totalDayVisitor:count}
  }



  // const branchCount = await Transaction.count({branch:branch.id,isBranch:true,date:currentDate}).select("-password")

  res.status(200).json({
    status: "success",
    data: {
    outlet,
    branch
    },
  });
})

//get all experience 
const getOutletExperience= catchAsync(async (req, res, next) => {

  let outlet = await Outlet.find({havePromo:true}).populate("category")

  for(i in outlet){
    outlet[i] = {...outlet[i]._doc}
  }

  let outletIDs = []

  for(let i in outlet){
      outletIDs.push(outlet[i]._id)
  }

  let count = 0;
  const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Dubai' })


  const day = new Date(currentDate).getDate().toString()
  const month = new Date(currentDate).getMonth().toString()
  const year = new Date(currentDate).getFullYear().toString()

  for(let i in outletIDs){
      count = await Transaction.count({outlet:outletIDs[i],day:day,month:month,year:year})
      outlet[i] =  {...outlet[i], totalDayVisitor:count}
  }

res.status(200).json({
  status: "success",
  data: {
   outlet
  },
});
})

//get outlet by category
const getOutletByCategory = async (req, res) => {
  try {
    const cat_id = req.params.id
    const outlet = await Outlet.find({category:cat_id}).select("-password").populate("category", "name").sort({ _id: -1 }).limit(5)

    res.status(200).json({
      status: "success",
      results: outlet.length,
      data: {
        outlet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


const searchOutletFilter = async (req, res) => {
  try{

    const category = req.body.category
    const region = req.body.place
    const feature = req.body.feature 
    const text = req.body.text
  
    const searchObj = {};
    
    if(category){
      searchObj["category"] =category
    }
    if(region){
      searchObj["region"] =region
    }
    if(feature){
      searchObj["feature"] =feature
    }

    if(text){
      searchObj["name"] = {$regex: '.*' + text + '.*',$options: 'i'}
    }
    
    const outlet = await Outlet.find(searchObj)

    let outletIDs = []

    for(let i in outlet){
        outletIDs.push(outlet[i]._id)
    }
  
    let count = 0;
    const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Dubai' })
  
    for(let i in outletIDs){
        count = await Transaction.count({outlet:outletIDs[i],date:currentDate})
        outlet[i] =  {...outlet[i]._doc, totalDayVisitor:count}
    }

    res.status(200).json({
      status: "success",
      results: outlet.length,
      data: {
        outlet,
      },
    });
  }catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}



const test = (req, res) => {
	res.send('mobile testing route')
}


module.exports = {
    test,
    outletLiveTracker,
    outletSingleLiveTracker,
    topNewestOutlet,
    getOutletExperience,
    getOutletByCategory,
    searchOutletFilter
}

