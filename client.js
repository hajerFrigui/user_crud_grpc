const grpc = require("grpc");
const protoLoader  = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("contract.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userManagPackage = grpcObject.userManagementPackage;

const client = new userManagPackage.UserManagement('localhost:9080',grpc.credentials.createInsecure());


client.add({
   id:1,
   name:'Omar',
   email:'omar@gmail.fr',
   password:'pwd'
},(error,response) => {
     console.log('user: '+JSON.stringify(response));
  }
)

client.get({
   value:1
},(error,response) => {
     console.log('user is '+JSON.stringify(response));
  }
)

client.getAll({},(error,response) => {
                  console.log('users are :'+JSON.stringify(response));
               }
)


client.dele({
   value:1
},(error,response) => {
     console.log(JSON.stringify(response));
  }
)










