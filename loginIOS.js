'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');


var Loading = require('./loadingIOS');
var Main = require('./Main');

var {
  Image,
  StyleSheet,
  TextInput,
  PixelRatio,
  View,
  TouchableHighlight,
  Text
} = React;

var loginIOS = React.createClass({

  getInitialState: function() {
    return {
      logging: 0
    };
  },

  onLoginHandler:function(){   
    this.setState({
      logging: 1
    });


    fetch('http://134.65.16.184:8000/userservice/session/login_user/test/111111')
      .then((response) => response.json())
      .then((json) => {this._loginHandler(json)})
      .catch((error) => {
        this.setState({
          logging:-1,
        });
      });
    
  },

//登陆有返回的操作
  _loginHandler:function(json){
    console.log(json);
    //登陆成功 1
     if(json.errcode === 0){
        this.setState({
          logging:0
        });
        this.props.navigator.replace({
          name: 'Main',
          id: 1,
          passProps:{
            title:'passTitle',
          },
        });
    }
    //login failed -1
    else{
      this.setState({
        logging:0,
      });
    }
  },

  render: function() {

    var content;
    if(this.state.logging === 1)
      content =
      <Image style={styles.imageLoading} source={require('./img/login_back.jpg')} resizeMode={'stretch'}>
        <Loading txt={'正在登录...'}></Loading> 
      </Image>;
    else if(this.state.logging === 0)
      content =
      <Image style={styles.image} source={require('./img/login_back.jpg')} resizeMode={'stretch'}>
        <TextInput style={styles.inputs} placeholder={'请输入用户名'} textAlign={'center'}> 
        </TextInput>
        <TextInput style={styles.inputs} placeholder={'请输入密码'} textAlign={'center'} password={true}>
        </TextInput>
        <TouchableHighlight underlayColor='#99d9f4' onPress={this.onLoginHandler.bind(this)} style={styles.button}><Text style={{color:'white'}}>登录</Text></TouchableHighlight>
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
    height:20*PixelRatio.get(),
    width:Dimensions.get('window').width*3/4,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderColor: '#DDDDDD',
    borderRadius: 4,
    marginBottom:1,
    alignSelf: 'center',
  },
  button: {
    height:20*PixelRatio.get(),
    width:Dimensions.get('window').width*2/3,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    marginTop:10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = loginIOS;