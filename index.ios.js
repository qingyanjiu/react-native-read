/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
// var TimerMixin = require('react-timer-mixin');
var Dimensions = require('Dimensions');

var Login = require('./loginIOS');


var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  PixelRatio,
  NavigatorIOS,
  View,
} = React;

var app = React.createClass({
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
    return (
      <NavigatorIOS ref="nav"
        navigationBarHidden={this.state.isNavBarHidden}
        style={styles.title}
        tintColor='#48BBEC'
        barTintColor='##FFFFFF'
        titleTextColor='#000000'
       // itemWrapperStyle={{
       // }}

        initialRoute={{
          title: '',
          component: Login,
//rightButtonTitle:'right',
          //将显示或隐藏navibar的方法作为参数传递给子节点来调用
          passProps:{
            show:this.show,
            hide:this.hide,
          }
        }}/>
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



AppRegistry.registerComponent('app', () => app);