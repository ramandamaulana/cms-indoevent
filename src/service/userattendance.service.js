import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
export default {
    getAll() {
        return axios({method: 'get',
        url:`${process.env.VUE_APP_URL}/api/admin/user-attendance`,
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
    getDetail(id) {
        return axios({method: 'get',
        url:`${process.env.VUE_APP_URL}/api/admin/user-attendance/` + id,
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
    }