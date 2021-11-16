import { RESTDataSource } from "apollo-datasource-rest";

class BeersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.punkapi.com/v2/";
  }

  async getBeerById(id) {
    return (await this.get(`beers/${id}`))[0];
  }

  async getBeersByName(name) {
    return this.get(`https://api.punkapi.com/v2/beers?beer_name=${name}`);
  }

  async getBeersById(ids) {
    return this.get(`beers?ids=${ids.join("|")}`);
  }

  async getBeers() {
    return this.get(`beers`);
  }
}

export default BeersAPI;
