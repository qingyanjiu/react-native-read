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
  render: function() {
   return (
          <TouchableOpacity style={styles.menuItem} onPress={() => this.props.callBack(this.props.id)}>
            <Image
              style={styles.button}
              source={this.props.imgSource}/>
              <Text style={styles.text}>{this.props.text}</Text>
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
});

module.exports = MenuItem;