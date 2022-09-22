// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                               { Requirements by NodeJs START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require("mongoose");
const fs = require("fs");
const _ = require('lodash');
const { escapeRegExp } = require("lodash");
const md5 = require('md5');
require("./conn/db");

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                               { Requirements by NodeJs END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@








// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                               { Requirements by APP START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                               { Requirements by APP END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@






// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                4. { ID Schema and Model START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const signupSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
});

const buyerID = mongoose.model("buyerID", signupSchema);
const sellerID = mongoose.model("sellerID", signupSchema);

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                 4. { ID Schema and Model END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@







// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                            { Product Schema and Model START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const techitemScehma = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    images: Array,
  });
  
  const Techitem = mongoose.model("Techitem", techitemScehma);

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                          { Product Schema and Model END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  





// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { APP.GET Login page START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.get('/login', function(req, res){
    res.render('guest/login');
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { APP.GET Login page END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                  6. { Post Request to Save Signup Info to MongoDB Atlas and Log Into Home Page START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.post('/signup-buyer', function(req, res){
  
    
    
    const signUpfName = req.body.signupfName;
    const signUplName = req.body.signuplName;
    const signUpEmail = req.body.signupEmail;
    const signUpPass = req.body.signupPass;
  
    
    
    
    const identity = new buyerID({
      fname: signUpfName,
      lname: signUplName,
      email: signUpEmail,
      password: md5(signUpPass),
    });
    
    identity.save(function(err){
      if(err){
        console.log(err);
      }else{



        Techitem.find({}, function(err, foundItems){
            if(err){
                console.log(err);
            }else{
                // console.log(foundItems);
                res.render('buyer/home', 
                {
                    foundItems: foundItems,
                    signUpfName: signUpfName,
                    signUplName: signUplName,
                    signUpEmail: signUpEmail
                })
            }
        })



      };
    });
  });
  
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                   6. { Post Request to Save Signup Info to MongoDB Atlas and Log Into Home Page END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@







// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { APP.POST Login page START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.post('/login-buyer', function(req, res){
    
    const loginEmail = req.body.loginEmail;
    const loginPass = md5(req.body.loginPass);

    
    buyerID.findOne({email: loginEmail}, function(err, foundUser){
        if(err){
          console.log(err)
        }else{
            if(foundUser){
              if(foundUser.password === loginPass){
    
                const signUpfName = foundUser.fname;
                const signUplName = foundUser.lname;
                const signUpEmail = loginEmail;

                Techitem.find({}, function(err, foundItems){
                    if(err){
                        console.log(err);
                    }else{
                        // console.log(foundItems);
                        res.render('buyer/home', 
                        {
                            foundItems: foundItems,
                            signUpfName: signUpfName,
                            signUplName: signUplName,
                            signUpEmail: signUpEmail
                        })
                    }
                })

              }else{
                console.log('incorrect pass');
              }
            }else{
              console.log('incorrect email');
            }
          }
        });
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { APP.POST Login page END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                  6. { Post Request to Save Signup Info to MongoDB Atlas and Log Into Home Page START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.post('/signup-seller', function(req, res){
  
    const foundItems = req.body.foundItems;
    
    const signUpfName = req.body.signupfName;
    const signUplName = req.body.signuplName;
    const signUpEmail = req.body.signupEmail;
    const signUpPass = req.body.signupPass;
  
    const identity = new sellerID({
      fname: signUpfName,
      lname: signUplName,
      email: signUpEmail,
      password: md5(signUpPass),
    });
    identity.save(function(err){
      if(err){
        console.log(err);
      }else{
        res.render('seller/home', 
        {
            signUpfName: signUpfName, 
            signUplName: signUplName, 
            signUpEmail: signUpEmail,
            foundItems: foundItems
        });
      };
    });
  });
  
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                   6. { Post Request to Save Signup Info to MongoDB Atlas and Log Into Home Page END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@







// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { APP.POST Login page START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.post('/login-seller', function(req, res){
    
    const loginEmail = req.body.loginEmail;
    const loginPass = md5(req.body.loginPass);

    
    sellerID.findOne({email: loginEmail}, function(err, foundUser){
        if(err){
          console.log(err)
        }else{
            if(foundUser){
              if(foundUser.password === loginPass){
    
                const signUpfName = foundUser.fname;
                const signUplName = foundUser.lname;
                const signUpEmail = loginEmail;
    

                res.render('seller/home');
              }else{
                console.log('incorrect pass');
              }
            }else{
              console.log('incorrect email');
            }
          }
        });
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { APP.POST Login page END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { APP.GET Home page START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.get('/', function(req, res){
    
    
    // Fetch products from Database START

      Techitem.find({}, function(err, foundItems){
        if(err){
            console.log(err);
        }else{
            // console.log(foundItems);
            res.render('guest/home', {foundItems: foundItems})
        }
    })

    // Fetch products from Database END  

})


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { APP.GET Home page END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                            { APP.POST Search bar Autocomplete START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.post('/getProducts', async (req, res) => {
    let payload = req.body.payload.trim();
    let search = await Techitem.find({title: {$regex: new RegExp('^'+payload+'.*','i')}}).exec();
    //Limit search result to 10
    search = search.slice(0, 10);
    res.send({payload: search});
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                            { APP.POST Search bar Autocomplete END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { Search for Products Home page START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.post('/products', function(req, res){
    
    let searchedProduct = req.body.searchProduct;
    searchedProduct = searchedProduct.toLowerCase();

    Techitem.find({}, function(err, foundItems){
        
        let foundItemsNew = [];

        if(searchedProduct.length > 0 ){
            if(err){
                console.log(err);
            }else{
                
                

                for(const item of foundItems){
                    
                    if(item.title.toLowerCase().includes(searchedProduct) || item.description.toLowerCase().includes(searchedProduct) || item.category.toLowerCase().includes(searchedProduct)){
                        foundItemsNew.push(item);
                    }
                    
                }
                // console.log(foundItemsNew);
                res.render('guest/products', {foundItemsNew: foundItemsNew})
            }
        }else{

            res.render('guest/products', {foundItemsNew: foundItemsNew});

        }
    })

}); 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { Search for Products Home page END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@






// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { Search for Products Home page START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.post('/products-user', function(req, res){
    
    let searchedProduct = req.body.searchProduct;
    searchedProduct = searchedProduct.toLowerCase();
    const signUpEmail = req.body.userEmail;
    
    Techitem.find({}, function(err, foundItems){
        
        let foundItemsNew = [];

        if(searchedProduct.length > 0 ){
            if(err){
                console.log('error in part 0' + err);
            }else{
                
                

                for(const item of foundItems){
                    
                    if(item.title.toLowerCase().includes(searchedProduct) || item.description.toLowerCase().includes(searchedProduct) || item.category.toLowerCase().includes(searchedProduct)){
                        foundItemsNew.push(item);
                    }
                    
                }
                
                buyerID.findOne({email: signUpEmail}, function(err, foundUser){
                    if(err){
                        console.log('error in part 1' + err);
                    }else{
                        if(foundUser){
                            
                  
                              const signUpfName = foundUser.fname;
                              const signUplName = foundUser.lname;
                              const signUpEmail = foundUser.email;
              
                              res.render('buyer/products', 
                              {
                                  foundItemsNew: foundItemsNew,
                                  signUpfName: signUpfName,
                                  signUplName: signUplName,
                                  signUpEmail: signUpEmail
                              })
              
                            
                          }else{
                            console.log('user not found (deleted I guess)');
                          }
                    }
                })
            }
        }else{

            buyerID.findOne({email: signUpEmail}, function(err, foundUser){
                if(err){
                    console.log(err);
                }else{
                    if(foundUser){
                        
              
                          const signUpfName = foundUser.fname;
                          const signUplName = foundUser.lname;
                          const signUpEmail = foundUser.email;
          
                          res.render('buyer/products', 
                          {
                              foundItemsNew: foundItemsNew,
                              signUpfName: signUpfName,
                              signUplName: signUplName,
                              signUpEmail: signUpEmail
                          })
          
                        
                      }else{
                        console.log('user not found (deleted I guess)');
                      }
                }
            })

        }
    })

}); 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { Search for Products Home page END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@




// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                              { Categories button Home page START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.post('/products-categories', function(req, res){
  
    

    function findDB(categoryName){
        Techitem.find({category: categoryName}, function(err, foundItemsNew){
            if(err){
                console.log(err);
            }else{
                // console.log(foundItemsNew);
                res.render('guest/products', {foundItemsNew: foundItemsNew})
            }
        })
    }

    
    const category = req.body.btnCategory;
    console.log(category);


    if(category === 'tech'){
        findDB(['smartphones', 'laptops']);
    }else if(category === 'skinCare'){
        findDB(['skincare']);
    }else if(category === 'fragrances'){
        findDB(['fragrances']);
    }else if(category === 'womensDress'){
        findDB(['womens-dresses']);
    }else if(category === 'decor'){
        findDB(['home-decoration']);
    }else if(category === 'shoes'){
        findDB(['mens-shoes', 'womens-shoes']);
    }
    else if(category === 'all'){
        Techitem.find({}, function(err, foundItemsNew){
            if(err){
                console.log(err);
            }else{
                // console.log(foundItems);
                res.render('guest/products', {foundItemsNew: foundItemsNew})
            }
        })   
    }
    else if(category === 'smartphones'){
        findDB(['smartphones']);
    }
    else if(category === 'laptops'){
        findDB(['laptops']);
    }
    else if(category === 'groceries'){
        findDB(['groceries']);
    }
    else if(category === 'furniture'){
        findDB(['furniture']);
    }
    else if(category === 'tops'){
        findDB(['tops']);
    }
    else if(category === 'mensShirts'){
        findDB(['mens-shirts']);
    }
    else if(category === 'mensShoes'){
        findDB(['mens-shoes']);
    }
    else if(category === 'mensWatches'){
        findDB(['mens-watches']);
    }
    else if(category === 'womensWatches'){
        findDB(['womens-watches']);
    }
    else if(category === 'womensBags'){
        findDB(['womens-bags']);
    }
    else if(category === 'womensJewellery'){
        findDB(['womens-jewellery']);
    }
    else if(category === 'sunglasses'){
        findDB(['sunglasses']);
    }
    else if(category === 'automotive'){
        findDB(['automotive']);
    }
    else if(category === 'motorcycle'){
        findDB(['motorcycle']);
    }
    else if(category === 'lighting'){
        findDB(['lighting']);
    }
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                              { Categories button Home page END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@






// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                              { Categories button Home page START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.post('/products-categories-user', function(req, res){
  
    const signUpEmail = req.body.userEmail2;
    

    function findDB(categoryName){
        Techitem.find({category: categoryName}, function(err, foundItemsNew){
            if(err){
                console.log(err);
            }else{
                

                buyerID.findOne({email: signUpEmail}, function(err, foundUser){
                    if(err){
                        console.log('error in part 1' + err);
                    }else{
                        if(foundUser){
                            
                  
                              const signUpfName = foundUser.fname;
                              const signUplName = foundUser.lname;
                              const signUpEmail = foundUser.email;
              
                              res.render('buyer/products', 
                              {
                                  foundItemsNew: foundItemsNew,
                                  signUpfName: signUpfName,
                                  signUplName: signUplName,
                                  signUpEmail: signUpEmail
                              })
              
                            
                          }else{
                            console.log('user not found (deleted I guess)');
                          }
                    }
                })
            }
        })
    }

    
    const category = req.body.btnCategory;
    console.log(category);


    if(category === 'tech'){
        findDB(['smartphones', 'laptops']);
    }else if(category === 'skinCare'){
        findDB(['skincare']);
    }else if(category === 'fragrances'){
        findDB(['fragrances']);
    }else if(category === 'womensDress'){
        findDB(['womens-dresses']);
    }else if(category === 'decor'){
        findDB(['home-decoration']);
    }else if(category === 'shoes'){
        findDB(['mens-shoes', 'womens-shoes']);
    }
    else if(category === 'all'){
        Techitem.find({}, function(err, foundItemsNew){
            if(err){
                console.log(err);
            }else{
                // console.log(foundItems);
                res.render('guest/products', {foundItemsNew: foundItemsNew})
            }
        })   
    }
    else if(category === 'smartphones'){
        findDB(['smartphones']);
    }
    else if(category === 'laptops'){
        findDB(['laptops']);
    }
    else if(category === 'groceries'){
        findDB(['groceries']);
    }
    else if(category === 'furniture'){
        findDB(['furniture']);
    }
    else if(category === 'tops'){
        findDB(['tops']);
    }
    else if(category === 'mensShirts'){
        findDB(['mens-shirts']);
    }
    else if(category === 'mensShoes'){
        findDB(['mens-shoes']);
    }
    else if(category === 'mensWatches'){
        findDB(['mens-watches']);
    }
    else if(category === 'womensWatches'){
        findDB(['womens-watches']);
    }
    else if(category === 'womensBags'){
        findDB(['womens-bags']);
    }
    else if(category === 'womensJewellery'){
        findDB(['womens-jewellery']);
    }
    else if(category === 'sunglasses'){
        findDB(['sunglasses']);
    }
    else if(category === 'automotive'){
        findDB(['automotive']);
    }
    else if(category === 'motorcycle'){
        findDB(['motorcycle']);
    }
    else if(category === 'lighting'){
        findDB(['lighting']);
    }
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                              { Categories button Home page END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@






// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                              { Categories button Home page END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.post('/products-:productName', function(req, res){
    

    let parameterName = req.body.productTitleForParam;
    req.params.productName = parameterName;

    const selectedProductID =  req.body.productID;
    const selectedProductCategoroy =  req.body.productCategory;


    Techitem.find({category: selectedProductCategoroy}, function(error, foundInfoAll){

        if(error){
            console.log(error)
        }else{
            Techitem.find({_id: selectedProductID}, function(err, foundInfo){
                if(err){
                    console.log(err);
                }else{
                    // console.log(foundInfo[0].raring);
                    // console.log(foudInfoAll[1]._id);
                    res.render('guest/productDetail', {foundInfo: foundInfo, foundInfoAll: foundInfoAll})
                }
            })
        }
    })
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                              { Categories button Home page END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





app.post('/custom', function(req, res) {
    
    const btnsNav = req.body.btnsNav;
    
    if(btnsNav === 'logo'){

        res.redirect('/');

    }else if (btnsNav === 'login') {

        res.redirect('/login');

    };
});








// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { APP.GET Home page START }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.listen(3000, function(req, res){
    console.log('Server Started on port 3000');
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 { APP.GET Home page END }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@














