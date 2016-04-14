'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var MenuItem = require('./MenuItem');

var {
  Image,
  StyleSheet,
  TextInput,
  PixelRatio,
  View,
  TouchableOpacity,
  Text
} = React;


var Menu = React.createClass({

/*点击时入参为空，将当前菜单编号0传给父组件Main.js的回调方法onMenuClickCallBack*/
  render: function() {
    var nameSource = require('./img/ic_drawer_login.png');
    var mainPageSource = require('./img/ic_drawer_home.png');
    var teamSource = require('./img/ic_drawer_explore.png');
    var taskSource = require('./img/ic_drawer_follow.png');
    var signSource = require('./img/ic_drawer_collect.png');

    return (
      <View>
        <View style={ styles.header }>
        </View>
        <View style={styles.container}>
          <MenuItem imgSource={nameSource} text='我' id='0' {...this.props} />
          <MenuItem imgSource={mainPageSource} text='主页' id='1' {...this.props} />
          <MenuItem imgSource={teamSource} text='团队' id='2' {...this.props}/>
          <MenuItem imgSource={taskSource} text='任务' id='3' {...this.props}/>
          <MenuItem imgSource={signSource} text='签到' id='4' {...this.props}/>
        </View>
      </View>   
      );
    }
  });


var styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#00FFFFFF'
  },
  container:{
    width:Dimensions.get('window').width*1/3,
    height:Dimensions.get('window').height - 60,
    backgroundColor:'#FFFFFF',
    flex:1,
    justifyContent:'flex-start',
    alignItems:'flex-start',
    alignSelf:'flex-start',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset:{h: 10, w: 0}
    // opacity:0.8,
  },
});

module.exports = Menu;