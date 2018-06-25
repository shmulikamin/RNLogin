
const FBURL =  "https://graph.facebook.com/v2.8/";

class FacebookService {

  static getUserName(userId, token) {
    const api = `${FBURL}${userId}?fields=name,email&access_token=${token}`;
      return fetch(api)
  }

}
export default FacebookService;
