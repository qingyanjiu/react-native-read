/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
// var TimerMixin = require('react-timer-mixin');
var Dimensions = require('Dimensions');

var Login = require('./readPage/loginIOS');
var Main = require('./readPage/ReadMain');
var Search = require('./readPage/ReadSearch');
var Utils = require('./readPage/Utils');


var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  PixelRatio,
  Navigator,
  View,
} = React;

var sessid;

var reading = React.createClass({

  componentWillMount:function(){
    //获取本地保存的sessionid
    Utils.getSessionId(
      function(data){
        sessid = data;
      }
    );
  },

  _renderScene:function(router, navigator){
      var Component = null;
      this._navigator = navigator;
      switch(router.id){
        case 0:
          Component = Login;
          break;
        case 1:
          Component = Main;
          break;
        case 2:
          Component = Search;
          break;
        default: //default view
          Component = Main;
      }
      return <Component navigator={navigator} router={router}  {...router.passProps}/>
  },

  getInitialState : function(){
    return{
      isNavBarHidden: true
    };
  },
  //用户隐藏或显示navibar
  show : function(){
    this.setState({
      isNavBarHidden: false
    });
  },
  hide : function(){
    this.setState({
      isNavBarHidden: true
    });
  },
  render() {
    var content;
    //如果有sessionid，直接跳过登录界面
    if(typeof(sessid) !== 'undefined')
      content = 1;
    else
      content = 0;
    return (
      <Navigator
        initialRoute={{name: 'index', index: content,id:content}}
        renderScene={this._renderScene} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
//    paddingTop: 10*PixelRatio.get(),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  image: {
    width:Dimensions.get('window').width*3/4,
    flex:1
  },
  button: {
    marginTop:-30*PixelRatio.get(),
    height: 36,
    width:70,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    flex:1,
    borderWidth:0
  }
});



AppRegistry.registerComponent('reading', () => reading);