
'use strict';

const axios = require('axios');

const mod = {};
mod.async = true;
mod.name = 'npm/downloads';
mod.args = 1;

/**
 * Fetches weekly downloads from npm package
 * 
 * @method callback
 * @param {array<string>} args URL arguments
 * @param {BadgeJS} badge Input badge
 * @returns {object} Badge options
 * @public
 */
mod.callback = async function(args, badge) {
    const pkg = args[0];

    let downloads;
    try {
        let res = await axios.get(`https://api.npmjs.org/downloads/point/last-week/${pkg}`, {
            headers: {
                Accept: 'application/vnd.npm.install-v1+json'
            }
        });

        downloads = res.data.downloads;
    } catch (e) {
        badge.label = 'downloads';
        badge.text = 'not found';
        badge.color = 'yellow';
        return badge;
    }

    badge.label = 'downloads';
    badge.text = `${downloads}/week`;
    badge.color = 'blue';
    return badge;
}

module.exports = mod;
