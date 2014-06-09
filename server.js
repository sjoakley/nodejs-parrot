var cluster = require('cluster');
var config  = require('config').Server

if (cluster.isMaster) {
  var processes = config.process;
  if (!processes) {
    // Count the machine's CPUs.
    processes = require('os').cpus().length;
  }
  // Fork the desired number of worker processes.
  for (var i = 0; i < processes; ++i) {
    cluster.fork();
  }
} else {
  var worker = require('./worker');
  worker.startServer();
}

// Listen for dying workers
 cluster.on('exit', function (worker) {
  // Replace the dead worker.
  console.log('Worker ' + worker.id + ' died :(');
  cluster.fork();
});
