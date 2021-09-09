import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
export default {
    getAll() {
        return axios({method: 'get',
        url:`${process.env.VUE_APP_URL}/api/admin/landing-page`,
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
          url:`${process.env.VUE_APP_URL}/api/admin/landing-page`,
          headers: {
              'Authorization': "Bearer " + user.data.access_token,
              'X_USER_ID': user.data.id,
              'Content-Type': "multipart/form-data",
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