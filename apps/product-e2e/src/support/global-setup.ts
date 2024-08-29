import { spawn, exec } from 'child_process';

let __TEARDOWN_MESSAGE__: string;

process.env.HOST = 'localhost';
process.env.PORT = '3002';

module.exports = async function() {
    // Start services that the app needs to run (e.g. database, docker-compose, etc.).
    console.log('\nSetting up...\n');

    // Start the API server
    const server = spawn('nx', ['serve', 'file-storage'], {
        shell: true,
        stdio: 'inherit'
    });

    const loop = async (ready, timeout) => {
        const { stdout, stderr } = await exec(`curl ${process.env.HOST}:${process.env.PORT}/api`);
        stdout.on('readable', () => {
            let data = stdout.read();

            try {
                data = JSON.parse(data);
                if (data.message === 'SUCCESS') {
                    clearTimeout(timeout);
                    console.log('clearTimeout');
                    ready();
                }
            } catch (ex) { /* empty */
            }
        });
    };

    // Store the server process in globalThis so it can be accessed in globalTeardown
    globalThis.__SERVER_PROCESS__ = server;
    // Hint: Use `globalThis` to pass variables to global teardown.
    globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';

    // You might want to wait for the server to be fully up before proceeding
    await new Promise((resolve) => {
        const timeout = setInterval(() => {
            loop(resolve, timeout);
        }, 5000);
    });
};
