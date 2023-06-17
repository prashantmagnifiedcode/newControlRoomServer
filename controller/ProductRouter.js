const Product= require("../models/ProductSchema")
const { productSchema } = require("../helper/adminAuthSchema");
module.exports={
    ProductAdd:async(req,res)=>{
        console.log("res",req.body)
        // const result = await productSchema.validateAsync(req.body);
        // console.log("res",req.body,result)
        for (let i = 0; i < req.files.length; i++) {
            console.log("name,", req.files[i]);
        }
        try{
            const Productdata= await new Product(req.body)
            // if (req.body.images?.length) {
            //     for (let i = 0; i < req.files.length; i++) {
            //         Productdata.images[i] = { name: req.files[i]?.location };
            //     }
            //   }
            const result = await Productdata.save();
            res.status(200).send(result);
        }catch(e){
            console.log("erro")
        }
        
    },
    FetchUnApprovedProduct:async(req,res)=>{
        try{
            const perPage = 50;
  const pageNo = req.query.page;
//   let search = req.query.search?.toLowerCase();
const sortBy = req.query.sortBy?.toLowerCase();
  
 console.log("sorteby",sortBy)
  const results = await Product.find({Status:{$ne:1}}).sort({[sortBy]:1});
  console.log("result",results)

  res.status(200).send({
      results: results,
    });
        }catch(e){
            console.log("erro",e)
        }
        
    },
    FetchallApprovedProduct:async(req,res)=>{
        try{
            const perPage = 50;
  const pageNo = req.query.page;
//   let search = req.query.search?.toLowerCase();
const sortBy = req.query.sortBy?.toLowerCase();
  
 console.log("sorteby",sortBy)
  const results = await Product.find({Status:1}).sort({[sortBy]:1});
  console.log("result",results)

  res.status(200).send({
      results: results,
    });
        }catch(e){
            console.log("erro",e)
        }
        
    },
    UpdateProduct:async(req,res)=>{
        try{
 
  
  
  const results = await Product.updateOne({_id:req.body._id},{$set:{Status:req.body.Status}});


  console.log("result",results)

  res.status(200).send();
        }catch(e){
            console.log("erro",e)
        }
        
    },
    DeleteProduct:async(req,res)=>{
        try{

  const {id}=req.params;
  
  const results = await Product.deleteOne({_id:id});
  console.log("reult",results)
  results.status(200).send();

        }catch(e){
            console.log("erro",e)
        }
        
    },
UserFilter:async(req,res)=>{
        try{

            const search = req.query.search?.toLowerCase();
            const sortBy = req.query.sortBy?.toLowerCase();
            console.log("search",search,sortBy)
            const regex=new RegExp(search,"i");
  const results = await Product.find({name:{$regex:regex},Status:{$ne:1}}).sort({[sortBy]: 1});
  res.status(200).send(results);

        }catch(e){
            console.log("erro",e)
        }
        
    },
    ApprovedFilter:async(req,res)=>{
        try{

            const search = req.query.search?.toLowerCase();
            const sortBy = req.query.sortBy?.toLowerCase();
            console.log("search",search,sortBy)
            const regex=new RegExp(search,"i");
  const results = await Product.find({name:{$regex:regex},Status:1}).sort({[sortBy]: 1});
  res.status(200).send(results);

        }catch(e){
            console.log("erro",e)
        }
        
    }
}