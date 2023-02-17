const runDaemon = async (iteration=10) => {
  const sleep = require('util').promisify(setTimeout);

  const name = process.argv[2] || 'default';
  const iterations = process.argv[3] || iteration;
  let counter = 0;
  let is_force_shutdown = false;

  process.on('SIGTERM', () => {
    console.log('Stopping task');
    is_force_shutdown = true;
  });
  while (true) {
    counter += 1;
    console.log(`Create PDF [${name}]: Loop ${counter}`);

    if (counter >= iterations || is_force_shutdown) {
      break;
    }

    await sleep(5000);
  }
}
module.exports = {
  runDaemon
};