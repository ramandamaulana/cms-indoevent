import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
export default {
    getAll() {
        return axios({method: 'get',
        url:"http://devapi.indoevent.id/api/admin/landing-page",
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
        return axios({
          method: 'post',
          url:"http://devapi.indoevent.id/api/admin/landing-page",
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