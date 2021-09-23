import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
export default {
    getAll() {
        return axios({method: 'get',
        url:`${process.env.VUE_APP_URL}/api/admin/admin`,
        headers: {
            'Authorization': "Bearer " + user.data.access_token,
            'X_USER_ID': user.data.id,
            'Content-Type': "application/json",
          }
          })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        }); 
      },       
   getDelete(id) {
    return axios.delete(
      `${process.env.VUE_APP_URL}/api/admin/admin/`+id,
        {   headers: {
            'Authorization': "Bearer " + user.data.access_token,
            'X_USER_ID': user.data.id,
            'Content-Type': "application/json",
          }}  
      )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  },
  postCrated(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_URL}/api/admin/admin`, data, {
        headers: {
          'Authorization': "Bearer " + user.data.access_token,
          'X_USER_ID': user.data.id,
          'Content-Type': 'multipart/form-data'
        }, 
      }).then(
        res => {
          resolve(res);
        },
        error => {
          reject(error);
        }
      );
    }); 
  },
    
    getShow(id) {
      return axios.get(
        `${process.env.VUE_APP_URL}/api/admin/admin/`+id,
          {   headers: {
              'Authorization': "Bearer " + user.data.access_token,
              'X_USER_ID': user.data.id,
              'Content-Type': "application/json",
            }}  
         )
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
    },
    
    postUpdate(id,params){
      return axios.post(`${process.env.VUE_APP_URL}/api/admin/admin/`+id ,params,{
          headers: {
              'Authorization': "Bearer " + user.data.access_token,
              'X_USER_ID': user.data.id,
              'Content-Type': "application/json",
            }
        }
      ).then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
    }
};