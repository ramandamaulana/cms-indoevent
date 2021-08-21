import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
export default {
    getAll() {
        return axios({method: 'get',
        url:"http://127.0.0.1:8000/api/admin/member",
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
        }); },

    postCrate(params) {
        return axios({method: 'post',
        url:"http://127.0.0.1:8000/api/admin/member",params,
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
        }); },
            
    getShow(id) {
      return axios.get(
        "http://127.0.0.1:8000/api/admin/member/"+id,
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
     
   getDelete(id) {
    return axios.delete(
      "http://127.0.0.1:8000/api/admin/member/"+id,
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
    url:"http://127.0.0.1:8000/api/admin/member",
    data:data,
    headers: {
        'Authorization': "Bearer " + user.data.access_token,
        'X_USER_ID': user.data.id,
        'Content-Type': 'multipart/form-data'
      }, 
      
  },{
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    }); },

    postUpdate(id,params){
      return axios.post("http://127.0.0.1:8000/api/admin/member/"+id ,params,{
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
 