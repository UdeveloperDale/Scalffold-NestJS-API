import { registerAs } from '@nestjs/config';

export default registerAs('config',() => {
    return {
        oauth: {
            clientId: process.env.OAUTH_CLIENID,
            clientSecret: process.env.OAUTH_CLIENSECRET,
            tenantId: process.env.OAUTH_TENANTID
        },
        port:process.env.PORT
    }
})