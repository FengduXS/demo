import axios from 'axios';
export function get(url, params = {}) {
  return new Promise((resolve,reject) => {
    axios.get(url,{
        params:params
          })
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err)
          })
  })
}
export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}
export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
        .then(response => {
          resolve(response.data);
        },err => {
          reject(err)
        })
  })
}
export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}