const axios = require('axios');

class commonAPICalls {

    env = `localhost:${process.env.API_PORT || 4000}`

    async updateMinParcelArea(actionName, minAreaValue) {
        const url = `http://${(this.env)}/action/${actionName}/rule/has-min-parcel-area`;
        const body = {
            config: {
                minArea: minAreaValue
            }
        };
      await this.putApiCall(url, body)
    }

  async updateMaxParcelArea(actionName, maxAreaValue) {
    const url = `http://${(this.env)}/action/${actionName}/rule/is-less-than-max-parcel-area`;
    const body = {
      config: {
        maxArea: maxAreaValue
      }
    };
    await this.putApiCall(url, body)
  }

  async putApiCall (url, body) {
    try {
      const response = await axios.put(url, body)
      console.log('Response:', response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

}

module.exports = new commonAPICalls();

