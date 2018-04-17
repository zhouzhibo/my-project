<template>
    <div class="register-card">
        <Card :padding="24">
            <p  slot="title"  class="register-card-title" >用户注册</p>
            <Form :model="registerInfo">
                <FormItem>
                    <Input type="text" v-model="registerInfo.user_name" placeholder="用户名" size="large" :clearable="true">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Input type="password" v-model="registerInfo.password" placeholder="密码" size="large" :clearable="true">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                     <Button type="primary" size="large" long v-on:click="register">注册</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      registerInfo: {
        user_name: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      let thiscomponent = this; 
      axios.post('http://127.0.0.1:3000/v1/users', {
                user_name : this.registerInfo.user_name,
                password  : this.registerInfo.password
        })
        .then(function (response) {
            switch (response.data.result) {
                case '1':
                    console.log("success");
                    thiscomponent.$Modal.success({
                        content: response.data.message,
                        onOk: () => {
                            thiscomponent.$router.push({path: '/'});
                        }
                    });
                    break;
                case '-1':
                    console.log("fail");
                    thiscomponent.$Modal.warning({
                        content: response.data.message
                    });
                    break;
                case '-2':
                    console.log("fail");
                    thiscomponent.$Modal.warning({
                        content: response.data.message
                    });
                    break;
                default:
                    break;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    test() {
      this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>Content of dialog</p><p>Content of dialog</p>',
                    okText: 'OK',
                    cancelText: 'Cancel'
                });
  }
  }
  
};
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
