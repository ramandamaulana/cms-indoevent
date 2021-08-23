import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
export default {
    getAll() {
        return axios({method: 'get',
        url:"http://127.0.0.1:8000/api/admin/landing-page",
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
      "http://127.0.0.1:8000/api/admin/landing-page/"+id,
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
    return axios({method: 'post',
    url:"http://127.0.0.1:8000/api/admin/landing-page",
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
        "http://127.0.0.1:8000/api/article/landing-page/"+id,
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
      return axios.post("http://127.0.0.1:8000/api/admin/landing-page/"+id ,params,{
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