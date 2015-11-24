'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var Drawer = require('react-native-drawer')

var Menu = require('./Menu');


var {
  Image,
  StyleSheet,
  TextInput,
  PixelRatio,
  View,
  TouchableHighlight,
  Text
} = React;


var Main = React.createClass({
  getInitialState:function(){
    return({
      id:'',
    });
  },

  onMenuClickCallBack:function(args){
    alert(
      args.id
    );     
    if(args.id=='0'){
      this.props.navigator.push({
          name: 'Ma',
          id: 2,});
    }
  },

  onClickHandler:function(){   
      this.props.navigator.push({
        name: 'Ma',
        id: 2,});
  },


  render: function() {
   return (
    <Drawer
      type="overlay"
      //openDrawerOffset={Dimensions.get('window').width*75/100} //50px gap on the right side of drawer ,菜单打开时离屏幕右端的距离
      panCloseMask={1} //can close with right to left swipe anywhere on screen ,这个数值表示你在屏幕的哪个地方滑动可以关闭菜单 1的意思是全屏幕都可以
      panOpenMask={0.05}//在哪里滑动可以打开菜单，这里的意思是要贴着屏幕边缘滑动才开启菜单
      styles={{
        drawer: {
          shadowColor: "#000000",
          shadowOpacity: 0,
          shadowRadius: 0,
        }
      }}
      tweenHandler={(ratio) => {
        return {
          drawer: { shadowRadius: Math.min(ratio*5*5, 5) },
          main: { opacity:(2-ratio)/2 },
        }
      }}

      //写入回调方法,从子组件回调方法中获取的入参名字为‘id’，将它作为参数传递给方法onMenuClickCallBack
      content={<Menu callBack={(id) => {this.onMenuClickCallBack({id:id})}}/>}
      >
        <View style={ styles.header }>
        </View>
        <View style={styles.container}>
          <Text style={{flex:1}}> {this.props.router.passProps.title}</Text>
          <TouchableHighlight underlayColor='#99d9f4' onPress={this.onClickHandler.bind(this)} style={styles.button}><Text style={{color:'white'}}>跳</Text></TouchableHighlight>
        </View>
    </Drawer>           
      );
    }
  });


var styles = StyleSheet.create({
  container:{
    padding:30,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
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
  },
  header: {
    height: 60,
    backgroundColor: '#EEEEEE',
    borderBottomWidth:1,
    borderBottomColor:'#CCCCCC'
  }
});

module.exports = Main;