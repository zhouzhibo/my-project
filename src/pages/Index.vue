<template>
  <div>我是首页{{user_name}}</div>
</template>

<script>
import axios from "axios"

export default {
    name:'Index',
    data(){
      return {
        user_name : ""
      }
    },
    mounted (){
      let thiscomponent = this;
      axios
        .post("http://127.0.0.1:3000/v1/users/info", {
            token : sessionStorage.getItem('token')
         })
        .then(function(response) {
               if (!response.data.sucess) {
                    thiscomponent.$router.push({ path: "/" });
                  } else {
                    thiscomponent.user_name = response.data.user_name;
                    return 
                  }
        })
        .catch(function(error) {
                console.log(error);
              });
    }
}
</script>

<style>

</style>
