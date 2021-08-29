import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
export default {
    getAll() {
        return axios({method: 'get',
        url:"http://127.0.0.1:8000/api/admin/ticket/schedule",
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
      "http://127.0.0.1:8000/api/admin/ticket/schedule/"+id,
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
    url:"http://127.0.0.1:8000/api/admin/ticket/schedule",
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
        "http://127.0.0.1:8000/api/admin/ticket/schedule/"+id,
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