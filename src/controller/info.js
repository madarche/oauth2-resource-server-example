'use strict'

// The call to process.env shall only be done once since it's costly
const pkg_name = process.env.npm_package_name
const pkg_version = process.env.npm_package_version
const full_name = `${pkg_name}-${pkg_version}`

/**
 * Returns the app info either as JSON or as text depending on the query
 */
function getAppInfo(ctx, next) {
    // No cache as we want this information to reflect the state of
    // the present moment.
    ctx.set('Cache-Control', 'no-cache')

    // Content Negotiation: return JSON for clients supporting it, but returning
    // text if the clients preferring HTML or having no Accept header.
    const match = ctx.accepts(['html', 'json'])
    if (match == 'json') {
        ctx.body = {
            name: pkg_name,
            version: pkg_version,
            full_name,
        }
        return
    }

    ctx.body = `${full_name}\n`
}

module.exports = {
    getAppInfo,
}
