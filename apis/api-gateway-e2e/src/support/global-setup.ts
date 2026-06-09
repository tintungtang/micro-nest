/* eslint-disable */
import { exec, spawn } from 'child_process';

process.env.HOST = 'localhost';
process.env.PORT = '3000';

module.exports = async function () {
  console.log('\nSetting up...\n');

  const server = spawn('nx', ['serve', 'api-gateway'], {
    shell: true,
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: process.env.PORT,
    },
  });

  const loop = async (ready, timeout) => {
    const { stdout } = await exec(`curl ${process.env.HOST}:${process.env.PORT}/api`);
    stdout.on('readable', () => {
      let data = stdout.read();

      try {
        data = JSON.parse(data);
        if (data.message === 'SUCCESS') {
          clearTimeout(timeout);
          ready();
        }
      } catch (ex) { /* empty */
      }
    });
  };

  globalThis.__SERVER_PROCESS__ = server;
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';

  await new Promise((resolve) => {
    const timeout = setInterval(() => {
      loop(resolve, timeout);
    }, 5000);
  });
};
