#!/usr/bin/env node

const https = require('https');
const process = require('process');

function fetchGitHubActivity(username) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            path: `/users/${username}/events`,
            method: 'GET',
            headers: { 'User-Agent': 'github-activity-cli' },
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => (data += chunk));

            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`Error: ${res.statusCode} ${res.statusMessage}`));
                }
            });
        });

        req.on('error', (error) => reject(error));
        req.end();
    });
}

function displayActivity(events) {
    if (!events.length) {
        console.log('No se encontró actividad reciente.');
        return;
    }

    events.forEach((event) => {
        switch (event.type) {
            case 'PushEvent':
                console.log(`- Pushed ${event.payload.commits.length} commits to ${event.repo.name}`);
                break;
            case 'IssuesEvent':
                console.log(`- ${event.payload.action} an issue in ${event.repo.name}`);
                break;
            case 'WatchEvent':
                console.log(`- Starred ${event.repo.name}`);
                break;
            default:
                console.log(`- ${event.type} on ${event.repo.name}`);
                break;
        }
    });
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error('Error: Debes proporcionar un nombre de usuario de GitHub.');
        console.log('Uso: github-activity <nombre_usuario>');
        process.exit(1);
    }

    const username = args[0];

    try {
        console.log(`Obteniendo actividad reciente para el usuario: ${username}...\n`);
        const events = await fetchGitHubActivity(username);
        displayActivity(events);
    } catch (error) {
        console.error('Error al obtener la actividad:', error.message);
    }
}

main();
