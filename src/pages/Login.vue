<template>
    <div class="register-card">
        <Card :padding="24">
            <p  slot="title"  class="register-card-title" >用户登录</p>
            <Form :model="userInfo">
                <FormItem>
                    <Input type="text" v-model="userInfo.user_name" placeholder="用户名" size="large" :clearable="true">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Input type="password" v-model="userInfo.password" placeholder="密码" size="large" :clearable="true">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                     <Button type="primary" size="large" long v-on:click="register">登录</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
import axios from "axios"

export default {
  name: "Login",
  data() {
    return {
      userInfo: {
        user_name: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      let thiscomponent = this;
      console.log("用户名：" + this.userInfo.user_name);
      console.log("密码：" + this.userInfo.password);
      axios
        .post("http://127.0.0.1:3000/v1/users/login", this.userInfo)
        .then(function(response) {
          if (response.data.result == "1") {
                    console.log("success");
                    thiscomponent.$Modal.success({
                    content: response.data.message,
                    onOk: () => {
                    thiscomponent.$router.push({ path: "/" });
                    }
               });
            } else {
                    thiscomponent.$Modal.warning({
                    content: response.data.message
                });
            }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
}
</script>

<style>
body {
  background-color: #eee;
}
.register-card {
  width: 400px;
  position: absolute;
  top: 35%;
  left: 50%;
  margin-left: -200px;
}
.register-card-title {
  text-align: center;
}
</style>
