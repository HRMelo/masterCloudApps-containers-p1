const grpc = require('grpc');
const UpperCaseService = require('./interface');
const helloServiceImpl = require('./upperCaseService');

const server = new grpc.Server();

const GRPC_HOST = process.env.GRPC_HOST || "127.0.0.1";
const GRPC_PORT = process.env.GRPC_PORT || "9090";

server.addService(UpperCaseService.service, helloServiceImpl);

server.bind('0.0.0.0:9090', grpc.ServerCredentials.createInsecure());

console.log(`gRPC server running at http://${GRPC_HOST}:${GRPC_PORT}`);

server.start();