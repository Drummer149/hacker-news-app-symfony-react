import Firebase from './Firebase';

/**
 * Base API Service to connect to data 
 */
const Api = class ApiService{

  constructor(store = Firebase, version = "v0"){
    this.API_VERSION = version;
    this.DB = Firebase.database();
  };

  // Method to return a promise of an array of story ids from a given endpoint
  getStoryIds(endPoint){
    return new Promise(resolve => {
      this.DB.ref(`${this.API_VERSION}/${endPoint}`).once('value', (storyIds) => {
        resolve(storyIds.val());
      });
    })
  };

  // Method to return a promise of an indivdual item object
  getItem(id){
    return new Promise(resolve => {
      this.DB.ref(`${this.API_VERSION}/item/${id}`).once('value', (item) => {
        resolve(item.val());
      });
    })
  };

};

// Initialise a singleton Api Service 
export default new Api;
