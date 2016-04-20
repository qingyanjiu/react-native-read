'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var Dimensions = require('Dimensions');

const Realm = require('realm');

var Constants = require('./Constants');
var Loading = require('./loadingIOS');

var {
  Image,
  StyleSheet,
  TextInput,
  PixelRatio,
  View,
  TouchableHighlight,
  Text,
} = React;



var loginIOS = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      logging: 0,
      username:'',
      password:'',
    };
  },

  onLoginHandler:function(){
    this.setState({
      logging: 1
    });

    fetch(Constants.URL+'/read/user/login',
          {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'post',
          body: JSON.stringify({ 
              'username': this.state.username,
              'password': this.state.password,
              'type':'ios'
          })
      })
      .then((response) => response.json())
      .then((json) => {this._loginHandler(json)})
      .catch((error) => {
        alert("登录失败，请稍后再试");
        this.setState({
            logging:0,
        });
      });
    
    // this.setTimeout(
    //      () => { 
    //       this.setState({
    //         logging:0
    //       });
    //       this.props.navigator.replace({
    //       name: 'Main',
    //       id: 1,
    //       passProps:{
    //         title:'passTitle',
    //       },
    //     }); },
    //      2000
    //    );
    
  },

  //登陆有返回的操作
  _loginHandler:function(json){   //登陆成功 
     if(json.result === 'success'){
        this.setState({
          logging:0
        });

        //
        //session信息写到本地存储
        //
        let realm = new Realm({
         schema: [{name: 'Session', properties: {id: 'string'}}]
       });

        realm.write(() => {
          //先删除所有本地保存的session
          let sessions = realm.objects('Session');
          realm.delete(sessions); 
          //然后将最新session放入
          let mySession = realm.create('Session', {
            id: json.sessionid,
          });
        });
        //
        //session信息写到本地存储
        //

        // let se = realm.objects('Session');
        // alert(se[0].id);


        this.props.navigator.replace({
          name: 'Main',
          id: 1,
          passProps:{
            title:'passTitle',
          },
        });
    }
    //登录失败
    else if(json.result === 'fail'){
      alert("用户名或密码错误");
      this.setState({
        logging:0,
      });
    }
  },

  render: function() {

    var content;
    if(this.state.logging === 1)
      content =
      <Image style={styles.imageLoading} source={require('../img/login_back.jpg')} resizeMode={'stretch'}>
        <Loading txt={'正在登录...'}></Loading> 
      </Image>;
    else if(this.state.logging === 0)
      content =
      <Image style={styles.image} source={require('../img/login_back.jpg')} resizeMode={'stretch'}>
        <TextInput style={styles.inputs} placeholder={'请输入用户名'} textAlign={'center'} onChangeText={(text) => this.setState({username:text})} value={this.state.username}> 
        </TextInput>
        <TextInput style={styles.inputs} placeholder={'请输入密码'} textAlign={'center'} password={true} onChangeText={(text) => this.setState({password:text})} value={this.state.password}>
        </TextInput>
        <TouchableHighlight underlayColor='#99d9f4' onPress={()=>{this.onLoginHandler()}} style={styles.button}><Text style={{color:'white'}}>登录</Text></TouchableHighlight>
      </Image>;

    return (
      <View style={styles.container}>
        {content}
      </View>
      
    );
  }
});

var styles = StyleSheet.create({
  container: {
//    paddingTop: 10*PixelRatio.get(),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  imageLoading:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    opacity:0.4
  },
  inputs: {
    height:40,
    width:Dimensions.get('window').width*3/4,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 0,
    borderColor: '#DDDDDD',
    borderRadius:20,
    marginBottom:10,
    alignSelf: 'center',
  },
  button: {
    height:40,
    width:Dimensions.get('window').width*2/3,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    marginTop:6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = loginIOS;