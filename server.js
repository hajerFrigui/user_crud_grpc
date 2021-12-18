const grpc = require("grpc");
const protoLoader  = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("contract.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userManagPackage = grpcObject.userManagementPackage;


const server = new grpc.Server();

server.bind('localhost:9080',grpc.ServerCredentials.createInsecure());

server.addService(userManagPackage.UserManagement.service,{
   'getAll': getAll,
   'get' : get,
   'add': add,
   'dele': dele
});

const users = [];

server.start();

function getAll(call,callback){
   const res = [];
   for(var i=0;i<users.length;i++){
      var user = {};
      user.id =  users[i].id;
      user.name =  users[i].name;
      user.email =  users[i].email;
      res.push(user);
   }
   callback(null,{value:res});
}

function get(call,callback){
   const id = call.request.value;
   var user ={};
   for(var i=0;i<users.length;i++){
     if(users[i].id == id){
      user.id =  users[i].id;
      user.name =  users[i].name;
      user.email =  users[i].email;
      break;
     }
   }
   callback(null,user);
}


function add(call,callback){
   const user = {
      id : call.request.id,
      name :call.request.name,
      email:  call.request.email,
      password:  call.request.password
   }
   
   users.push(user);
   const result = {
      id : call.request.id,
      name :call.request.name,
      email:  call.request.email
   }
   callback(null,result);
}


function dele(call,callback){
   const id = call.request.value;
   for(var i=0;i<users.length;i++){
     if(users[i].id == id){
      users.splice(i,1);
      break;
     }
   }
  callback(null);
}


