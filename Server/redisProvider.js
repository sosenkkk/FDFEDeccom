const { Redis } = require("ioredis");

const redisClient = new Redis();

//helper function for redis 
async function getOrSetCache(key, ex, cb) {
    return new Promise(async (resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            console.log("hello again!", data);
            if (error) return reject(error)
            if (data != null) {
                return resolve(JSON.parse(data));
            }
            const freshData = await cb();
            redisClient.setex(key, ex, JSON.stringify(freshData));
            resolve(freshData);
        })
    })
};


module.exports = {
    getOrSetCache: getOrSetCache,
    redisClient: redisClient
}