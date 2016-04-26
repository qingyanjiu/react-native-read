'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');


var {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} = React;

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

//下方菜单条控件
//props:
//callback--返回当前点击的菜单编号
//selectedId--选中的菜单编号
var ReadFoot = React.createClass({

  getInitialState:function(){
    return({
      menuSelectedId:this.props.selectedId,
    });
  },

  _onPressMenu:function(menuId){
    this.setState({
      menuSelectedId:menuId
    });
    this.props.callback(menuId);
  },
  
  render: function() {
  var menus;
  //当前是哪个页面，那个按钮就不能重复点击
  if(this.state.menuSelectedId === 1)
    menus = 
        <View style={ styles.footer }>
          <View style={styles.footerItem}>
            <View style={styles.footerMenu}>
              <Image style={styles.footerSelectedImg} source={require('../img/foot_icon_home.png')}>
              </Image>
            </View>
          </View>
          <View style={styles.footerItem}>
            <TouchableOpacity style={styles.footerMenu} onPress={()=>{this._onPressMenu(2)}}>
              <Image style={styles.footerImg} source={require('../img/foot_icon_search.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItem} onPress={()=>{this._onPressMenu(3)}}>
            <TouchableOpacity   style={styles.footerMenu}>
              <Image style={styles.footerImg} source={require('../img/foot_icon_plan.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItem} onPress={()=>{this._onPressMenu(4)}}>
            <TouchableOpacity   style={styles.footerMenu}>
              <Image style={styles.footerImg} source={require('../img/foot_icon_history.png')}>
              </Image>
            </TouchableOpacity>
          </View>
        </View>;
  else if(this.state.menuSelectedId === 2)
    menus = 
        <View style={ styles.footer }>
          <View style={styles.footerItem}>
            <TouchableOpacity style={styles.footerMenu} onPress={()=>{this._onPressMenu(1)}}>
              <Image style={styles.footerImg} source={require('../img/foot_icon_home.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItem}>
            <View style={styles.footerMenu}>
              <Image style={styles.footerSelectedImg} source={require('../img/foot_icon_search.png')}>
              </Image>
            </View>
          </View>
          <View style={styles.footerItem} onPress={()=>{this._onPressMenu(3)}}>
            <TouchableOpacity   style={styles.footerMenu}>
              <Image style={styles.footerImg} source={require('../img/foot_icon_plan.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItem} onPress={()=>{this._onPressMenu(4)}}>
            <TouchableOpacity   style={styles.footerMenu}>
              <Image style={styles.footerImg} source={require('../img/foot_icon_history.png')}>
              </Image>
            </TouchableOpacity>
          </View>
        </View>;
  else if(this.state.menuSelectedId === 3)
    menus = 
        <View style={ styles.footer }>
          <View style={styles.footerItem}>
            <TouchableOpacity style={styles.footerMenu} onPress={()=>{this._onPressMenu(1)}}>
              <Image style={styles.footerImg} source={require('../img/foot_icon_home.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItem}>
            <TouchableOpacity style={styles.footerMenu} onPress={()=>{this._onPressMenu(2)}}>
              <Image style={styles.footerImg} source={require('../img/foot_icon_search.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItem}>
            <View   style={styles.footerMenu}>
              <Image style={styles.footerSelectedImg} source={require('../img/foot_icon_plan.png')}>
              </Image>
            </View>
          </View>
          <View style={styles.footerItem} onPress={()=>{this._onPressMenu(4)}}>
            <TouchableOpacity   style={styles.footerMenu}>
              <Image style={styles.footerImg} source={require('../img/foot_icon_history.png')}>
              </Image>
            </TouchableOpacity>
          </View>
        </View>;
  else if(this.state.menuSelectedId === 4)
    menus = 
        <View style={ styles.footer }>
          <View style={styles.footerItem}>
            <TouchableOpacity style={styles.footerMenu} onPress={()=>{this._onPressMenu(1)}}>
              <Image style={styles.footerImg} source={require('../img/foot_icon_home.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItem}>
            <TouchableOpacity style={styles.footerMenu} onPress={()=>{this._onPressMenu(2)}}>
              <Image style={styles.footerImg} source={require('../img/foot_icon_search.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItem}>
            <TouchableOpacity   style={styles.footerMenu} onPress={()=>{this._onPressMenu(3)}}>
              <Image style={styles.footerImg} source={require('../img/foot_icon_plan.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItem}>
            <View   style={styles.footerMenu}>
              <Image style={styles.footerSelectedImg} source={require('../img/foot_icon_history.png')}>
              </Image>
            </View>
          </View>
        </View>;

   return (
        <View>
          {menus}
        </View>  
      );
    }
  });

var styles = StyleSheet.create({
  footer: {
    height: 58,
    backgroundColor: 'rgba(219,188,86,0.4)',
    borderBottomWidth:0,
    flexDirection:'row',
    marginTop:1,
  },
  footerImg:{
    width:36,
    height:36,
  },
  footerSelectedImg:{
    width:36,
    height:36,
    opacity:0.2
  },
  footerItem:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  footerMenu:{
    flexDirection:'column',
    alignItems:'center',
  },
});

module.exports = ReadFoot;