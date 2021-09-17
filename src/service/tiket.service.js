import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
export default {
    getAll(params) {
        return axios({method: 'get',
        url:`${process.env.VUE_APP_URL}/api/admin/ticket`,
        params:params,
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

  postCrated(data) {
    return axios({method: 'post',
    url:`${process.env.VUE_APP_URL}/api/admin/ticket`,
    headers: {
        'Authorization': "Bearer " + user.data.access_token,
        'X_USER_ID': user.data.id,
        'Content-Type': "application/json",
      }, 
      data:data,
  },{
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    }); },
    
    getShow(id) {
      return axios.get(
        `${process.env.VUE_APP_URL}/api/admin/ticket/`+id,
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
      return axios.post(`${process.env.VUE_APP_URL}/api/admin/ticket/`+id ,params,{
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
    },

    getDelete(id) {
      return axios.delete(
        `${process.env.VUE_APP_URL}/api/admin/ticket/`+id,
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
};