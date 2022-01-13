const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Outlet = require("./../models/Outlet");
const User = require("./../models/User");
const Booking = require("../models/Transaction");
const Category = require("./../models/Category");
const Feature = require("./../models/Feature");
const Visitor = require("./../models/Visitor")
const Transaction = require("./../models/Transaction")
const RegisterTransaction = require("./../models/RegisterTransaction")
const Branch = require('./../models/Branch');


exports.getAllTotal = catchAsync(async (req, res, next) => {
  const outlet = await Outlet.find();
  const user = await User.find();
  const booking = await Booking.find();
  const category = await Category.find();
  const visitor = await Visitor.find()
  const transaction = await Transaction.find()
  const registerTransaction = await RegisterTransaction.find()
  
  let totalAmount = 0;
  let totalMembershipEarnings = 0

  for(let i in transaction){
    totalAmount += transaction[i].totalPrice
  }

  for(let i in registerTransaction){
    totalMembershipEarnings+= registerTransaction[i].amountPaid
  }

  const countMale = await User.find({gender:'male'})
  const countFemale = await User.find({gender:'female'})
  


  res.status(200).json({
    status: "success",
    data: {
      numOutlet: outlet.length,
      numUser: user.length,
      numBooking: booking.length,
      numCategory: category.length,
      numVisitor: visitor.length,
      numTransaction: transaction.length,
      numTotalSpent: totalAmount,
      numMembershipEarnings: totalMembershipEarnings,
      numMale:countMale.length,
      numFemale:countFemale.length
    },
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  const outlet = await Outlet.find().populate("category");
  let category = await Category.find()
  const branch = await Branch.find().populate('outlet','category')
  

  let catList = {}
  let uniqCat = []

  for(let i in outlet){
    if(!(outlet[i].category.name in catList)){
      catList[outlet[i].category.name] = 1
      uniqCat.push((outlet[i].category.name))
    }else{
      catList[outlet[i].category.name] =  catList[outlet[i].category.name] + 1
    }
  }

  for(let i in category){
    for(let j in uniqCat)
      if(category[i].name === uniqCat[j]){
        category[i] = {...category[i]._doc,count:catList[uniqCat[j]]}
        break;
      }
  }

  for(let i in branch){
    for(j in category){
      if(branch[i].outlet.category.toString() === category[j]._id.toString()){
        category[j].count+=1
        break;
      }
    }

  }


  res.status(200).json({
    status: "success",
    data: {
      category
    },
  });
});


exports.groupByCategory = catchAsync(async (req, res, next) => {

  let category = await Outlet.aggregate([
      {
        $group: {
          _id: "$category",
          "count": { "$sum": 1 },
        }
      },
  ])

  category = await outlet.populate('category')

  res.status(200).json({
    status: "success",
    data: {
      category
    },
  });
});


exports.outletsStatsInfo = catchAsync(async (req, res, next) => {
  //count number of occurence of outlets in the array
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  
  const visitor = await Visitor.find().populate("outlet")
  const transaction = await Transaction.find().populate("outlet")

  let outletVisitors =  {}
  let outletTransactions = {}
  let outletTotalEarnings = {}

  for(let i  in visitor){
    if(!(visitor[i].outlet.name in outletVisitors)){
      outletVisitors[visitor[i].outlet.name] = 1
    }else{
      outletVisitors[visitor[i].outlet.name] =  outletVisitors[visitor[i].outlet.name] + 1
    }
  }

  for(let i in transaction){
    if(!(transaction[i].outlet.name in outletTransactions)){
      outletTransactions[transaction[i].outlet.name] = 1
    }else{
      outletTransactions[transaction[i].outlet.name] = outletTransactions[transaction[i].outlet.name] + 1
    }
  }

  for(let i in transaction){
    if(!(transaction[i].outlet.name in outletTotalEarnings)){
      outletTotalEarnings[transaction[i].outlet.name] = transaction[i].totalPrice
    }else{
      outletTotalEarnings[transaction[i].outlet.name] = outletTotalEarnings[transaction[i].outlet.name] + transaction[i].totalPrice
    }
  }

  res.status(200).json({
    status: "success",
    data: {
      outletVisitors,
      outletTransactions,
      outletTotalEarnings,
    },
  });
});


// get customer stats

exports.getIndividualCustomerStats = catchAsync(async (req, res, next) => {

  const user_id = req.params.id;

  const user_data = await User.findById(user_id);
  const user_transaction = await Transaction.find({user:user_id})
  const user_visit =await Visitor.find({user:user_id})

  

  let total_spent =  0
  for(let i in user_transaction){
    total_spent += user_transaction[i].totalPrice
  }

  let total_saving = 0
  for(let i in user_transaction){
    total_saving = user_transaction[i].saveMoney
  }

  let count_transaction = await Transaction.count({_id:user_id})
  let count_visit = await Visitor.count({_id:user_id})
 
  res.status(200).json({
    status: "success",
    user_profile: {
      user_data
    },
    user_transactions:{
        user_transaction
    },
    user_visits:{
      user_visit
    },
    total_spent: total_spent,
    total_saving: total_saving,
    count_transaction: count_transaction,
    count_visit: count_visit
  });
});



// get overall customer stats

exports.getOverAllCustomerStats = catchAsync(async (req, res, next) => {
  
  const total_user_count= await User.count({})

  const user_count_guest = await User.find({userType:"Guest"}).count()
  const count_user_individual = await User.find({userType:"Individual"}).count()
  const count_user_family_main = await User.find({userType:"Main"}).count()
  const count_user_family_secondary = await User.find({userType:"Secondary"}).count()

  const count_user_male = await User.find({gender:"Male"}).count()
  const count_user_female = await User.find({gender:"Female"}).count()

  const transaction= await Transaction.find()
  
  let count_total_spent = 0
  let count_total_saving = 0

  for(let i in transaction){
    count_total_spent +=transaction[i].totalPrice
    count_total_saving +=transaction[i].saveMoney
  }

  const count_total_visit = await Visitor.count({})
  const count_total_transaction = await Transaction.count({})

  const user = await User.find()

  let listNationality = {}
  let nat = []

  for(let i in user){
    if(user[i].nationality in listNationality){
      listNationality[user[i].nationality ] = listNationality[user[i].nationality ] + 1
    }else{
      listNationality[user[i].nationality ] = 1
      nat.push(user[i].nationality )
    }
  }

  const registerTransaction = await RegisterTransaction.find()

  let total_membership_earnings = 0
  const count_membership_transaction = await RegisterTransaction.count({})
  

  for(let i in registerTransaction){
    total_membership_earnings +=registerTransaction[i].amountPaid
  }


  res.status(200).json({
    status: "success",
    data: {
      
        total_user_count: total_user_count,
        count_user_guest:user_count_guest,
        count_user_individual:count_user_individual,
        count_user_family_main:count_user_family_main,
        count_user_family_secondary:count_user_family_secondary,
        count_user_male:count_user_male,
        count_user_female:count_user_female,
        count_total_spent:count_total_spent,//
        count_total_saving:count_total_saving,//
        count_total_visit:count_total_visit,
        count_total_transaction:count_total_transaction,
        total_membership_earnings:total_membership_earnings, //
        count_membership_transaction:count_membership_transaction,
      
      listNationality,
      nat
    },
  });
});

exports.getIndividualOutletStats = catchAsync(async (req, res, next) => {

  const outlet_id = req.params.id;
  
  const outlet = await Outlet.findById(outlet_id)
  const transaction = await Transaction.find({outlet:outlet_id})
  const total_outlet_main_visit = await Visitor.count({outlet:outlet_id,isBranch:false})
  
  const list_outlet_main_visit = await Visitor.find({outlet:outlet_id,isBranch:false})
  const list_outlet_main_transaction  = await Transaction.find({outlet:outlet_id,isBranch:false})
  
  const transaction_branch = await Transaction.find({outlet:outlet_id,isBranch:true})

  const list_outlet_branch = await Branch.find({outlet:outlet_id})
  const count_outlet_branch = await Branch.count({outlet:outlet_id})


  let total_outlet_earning = 0
  let total_outlet_branch_earning = 0

  for(let i in transaction_branch){
    total_outlet_branch_earning +=transaction_branch[i].totalPrice
  }

  for(let i in transaction){
    total_outlet_earning += transaction[i].totalPrice
  }


  res.status(200).json({
    status: "success",
    data: {
      outlet,
      total_outlet_earning:total_outlet_earning,
      total_outlet_main_visit:total_outlet_main_visit,
      list_outlet_main_visit,
      list_outlet_main_transaction,
      list_outlet_branch,
      count_outlet_branch:count_outlet_branch,
      total_outlet_branch_earning:total_outlet_branch_earning
    },
  });
});




exports.getBranchOutletStats = catchAsync(async (req, res, next) => {

  const branch_id = req.params.id

  const count_branch_transaction = await Transaction.count({branch:branch_id,isBranch:true})
  const count_branch_visit = await Visitor.count({branch:branch_id,isBranch:true})

  const branch_transaction = await Transaction.find({branch:branch_id,isBranch:true})
  const branch_visit = await Visitor.find({branch:branch_id,isBranch:true})

  let total_earnings = 0

  for(let i in branch_transaction){
    total_earnings += branch_transaction[i].totalPrice
  }


  res.status(200).json({
    status: "success",
    data: {
      count_branch_transaction:count_branch_transaction,
      count_branch_visit:count_branch_visit,
      total_earnings:total_earnings,
      branch_transaction,
      branch_visit
    },
  });
});




exports.getOverallOutletStats = catchAsync(async (req, res, next) => {

    const count_outlet = await Outlet.count({})
    const count_transaction = await Transaction.count({})
    const count_visit = await Visitor.count({})
    const count_branch = await Branch.count({})

    const transaction = await Transaction.find()

    let total_spent = 0

    for(let i in transaction){
      total_spent += transaction[i].totalPrice
    }

    const outlet = await Outlet.find()
    const branch = await Branch.find()
    const visit = await Visitor.find()
   


  res.status(200).json({
    status: "success",
    data: {
      count_outlet:count_outlet,
      count_transaction:count_transaction,
      count_visit:count_visit,
      count_branch:count_branch,
      total_spent:total_spent,
      outlet,
      branch,
      visit
    },
  });
});


exports.outletStatsCustomer= catchAsync(async (req, res, next) => {

  let outlet = await Outlet.find().select("id name")

  const transaction = await Transaction.find().populate("outlet")
  const visitor = await Visitor.find()

  let count = 0
  for(let i in outlet){
      count = await Transaction.count({outlet:outlet[i]._id})
      outlet[i] = {...outlet[i]._doc,transaction_count:count}
  }
  for(let i in outlet){
    count = await Visitor.count({outlet:outlet[i]._id})
    outlet[i] = {...outlet[i],visitor_count:count}
}
let n = 0
let sum = 0
for(let i in outlet){
  sum = 0
    n = await Transaction.find({outlet:outlet[i]._id})
    for(j in n){
        sum+=n[j].totalPrice
    }
    outlet[i] = {...outlet[i],transaction_earning:sum}
}



  // for(let i in outlet){
  //   count = 0
  //     for(let j in transaction){
  //       if(transaction[j].outlet._did === outlet[i]._id)
  //         count++;
  //     }
  //     outlet[i] = {...outlet[i]._doc,transaction_count:count}
  // }

  // for(let i in outlet){
  //   count = 0
  //     for(let j in visitor){
  //       if(visitor[j].outlet.id === outlet[i]._id)
  //         count++;
  //     }
  //     outlet[i] = {...outlet[i],visitor_count:count}
  // }

  // let totalEarning = 0

  // for(let i in outlet){
  //   totalEarning = 0
  //     for(let j in transaction){
  //       if(transaction[j].outlet.id === outlet[i]._id)
  //         totalEarning+= transaction[j].totalPrice
  //     }
  //     outlet[i] = {...outlet[i],total_earning:totalEarning}
  // }

  res.status(200).json({
    status: "success",
    data: {
      outlet
    },
  });

})




exports.getOverallOutletStats = catchAsync(async (req, res, next) => {

  const count_outlet = await Outlet.count({})
  const count_transaction = await Transaction.count({})
  const count_visit = await Visitor.count({})
  const count_branch = await Branch.count({})

  const transaction = await Transaction.find()

  let total_spent = 0

  for(let i in transaction){
    total_spent += transaction[i].totalPrice
  }

  const outlet = await Outlet.find()
  const branch = await Branch.find()
  const visit = await Visitor.find()
 


res.status(200).json({
  status: "success",
  data: {
    count_outlet:count_outlet,
    count_transaction:count_transaction,
    count_visit:count_visit,
    count_branch:count_branch,
    total_spent:total_spent,
    outlet,
    branch,
    visit
  },
});
});


exports.totalOutletLiveTracker= catchAsync(async (req, res, next) => {

  let outlet = await Outlet.find()

  for(i in outlet){
    outlet[i] = {...outlet[i]._doc}
  }


  let outletIDs = []

  for(let i in outlet){
      outletIDs.push(outlet[i]._id)
  }

  let count = 0;
  const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Dubai' })

  for(let i in outletIDs){
      count = await Transaction.count({outlet:outletIDs[i],date:currentDate})
      outlet[i] =  {...outlet[i], totalDayVisitor:count}
  }

res.status(200).json({
  status: "success",
  data: {
   outlet
  },
});

})




exports.totalBranchLiveTracker= catchAsync(async (req, res, next) => {

  let branch = await Branch.find()

  for(i in branch){
    branch[i] = {...branch[i]._doc}
  }


  let branchIDs = []

  for(let i in branch){
    branchIDs.push(branch[i]._id)
  }

  let count = 0;
  const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Dubai' })

  for(let i in branchIDs){
      count = await Transaction.count({branch:branchIDs[i],date:currentDate})
      branch[i] =  {...branch[i], totalDayVisitor:count}
  }

res.status(200).json({
  status: "success",
  data: {
   branch
  },
});

})


























