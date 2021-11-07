const ImageKit = require("imagekit");
const env = require("../config/env");

class UserMedia {
  static async authImageKit(req, res) {
    const { NODE_ENV } = env;
    const enviroment = env[NODE_ENV];
    const imagekit = new ImageKit({
      urlEndpoint: enviroment.IMAGEKIT_URL_ENDPOINT,
      publicKey: enviroment.IMAGEKIT_PUBLIC_KEY,
      privateKey: enviroment.IMAGEKIT_PRIVATE_KEY,
    });
    // return imagekit.getAuthenticationParameters();
    res.send(imagekit.getAuthenticationParameters())
  }
}

module.exports = UserMedia;
