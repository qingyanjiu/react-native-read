'use strict';

//drawer拉出菜单的菜单项，传入props有要显示的图片source－imgSource；要调用的方法的菜单id－id；要显示的文字-text

var React = require('react-native');
var Dimensions = require('Dimensions');


var {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} = React;


var MenuItem = React.createClass({
  getInitialState:function(){
    return({
      //主页面传来的已选择的菜单id,如果和自己id一样就是选中了 否则没选中
      selected:this.props.selectId === this.props.id ? true : false,
    });
  },
  //设置为已选择，改变唯一选择的样式，然后调用主界面的回调函数
  _onPress:function(){
    this.setState({
      selected:true,
    });
    this.props.callBack(this.props.id);
  },

  render: function() {
    var st;
    var textSt;
    if(this.state.selected===true){
      st = styles.menuItemSelected;
      textSt = styles.textSelected;
    }
    else{
      st = styles.menuItem;
      textSt = styles.text;
    }
   return (
          //这是接收参数并传值的调用方式
          // <TouchableOpacity style={st} onPress={() => this.props.callBack(this.props.id)}>
          //不接受参数就像下面这样调用即可
          <TouchableOpacity style={st} onPress={this._onPress}>
            <Image
              style={styles.button}
              source={this.props.imgSource}/>
              <Text style={textSt}>{this.props.text}</Text>
          </TouchableOpacity> 
      );
    }
  });


var styles = StyleSheet.create({
  text:{
    flex:3,
    marginLeft:10,
    backgroundColor:'#00FFFFFF'
  },
  textSelected:{
    color:'#FFFFFF',
    flex:3,
    marginLeft:10,
    backgroundColor:'#00FFFFFF'
  },
  button: {
    height:Dimensions.get('window').width*11/100,
    width:Dimensions.get('window').width*10/100,
    backgroundColor: '#00FFFFFF',
    flex:2,
    marginLeft:10,
  },
  menuItem: {
    flexDirection:'row',
    height:Dimensions.get('window').height*11/100,
    width:Dimensions.get('window').width*1/3,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth:1,
    borderBottomColor:'#DDDDDD'
  },
  menuItemSelected: {
    flexDirection:'row',
    height:Dimensions.get('window').height*11/100,
    width:Dimensions.get('window').width*1/3,
    backgroundColor: '#005dd5',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth:1,
    borderBottomColor:'#DDDDDD'
  },
});

module.exports = MenuItem;