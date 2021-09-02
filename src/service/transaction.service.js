import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
export default {
    getAll() {
        return axios({method: 'get',
        url:"http://devapi.indoevent.id/api/admin/transaction",
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
      "http://devapi.indoevent.id/api/admin/transaction/"+id,
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

  postSuccess(data) {
    return axios({
      method: 'post',
      url:"http://devapi.indoevent.id/api/admin/transaction/success",
      headers: {
          'Authorization': "Bearer " + user.data.access_token,
          'X_USER_ID': user.data.id,
          'Content-Type': "application/json",
        }, 
        data:data,
    })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  },
  postFailed(data) {
    return axios({
      method: 'post',
      url:"http://devapi.indoevent.id/api/admin/transaction/failed",
      headers: {
          'Authorization': "Bearer " + user.data.access_token,
          'X_USER_ID': user.data.id,
          'Content-Type': "application/json",
        }, 
        data:data,
    })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  },

    

    
  
};