'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var Drawer = require('react-native-drawer')

var Menu = require('./Menu');
var Sign = require('./Sign');


var {
  Image,
  StyleSheet,
  TextInput,
  PixelRatio,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  StatusBarIOS,
  Modal
} = React;


var Main = React.createClass({
  componentDidMount:function(){
    StatusBarIOS.setStyle(1);
  },

  getInitialState:function(){
    return({
      //已选择的菜单id,判断是否存在，如果不存在 说明是第一次进来，设置为1
      menuSelectedId:this.props.router.passProps.menuSelectedId ? this.props.router.passProps.menuSelectedId:'1',
      modalShow:false,
    });
  },

  onMenuClickCallBack:function(args){
    alert(
      args.id
    );

    this.props.navigator.replace({
      name: 'Main',
      id: 1,          
      //跳转到main页面（routeid为1） 然后传递最新点击的菜单id过去选中，同时菜单id也决定页面中显示内容的不同 render方法中做判断
      passProps:{
        menuSelectedId:args.id
      },
    });
  },

  onClickHandler:function(){   
      this.props.navigator.push({
        name: 'Ma',
        id: 2,});
  },

  //显示下拉菜单
  _openModalMenu:function(){
    this.setState({
      modalShow:true,
    });
  },
  //隐藏下拉菜单
  _closeModalMenu:function(){
    this.setState({
      modalShow:false,
    });
  },

  render: function() {
    var content;
    //默认显示的内容
    if(this.state.menuSelectedId==='1')
      //头部菜单,//点击右边头部菜单 弹出的下拉菜单
      content = 
      <View style={{flex:1}}> 
      
        <View style={ styles.header }>
          <View style={styles.headerLeftMenu}>
            <TouchableOpacity><Image style={styles.headerImg}
              source={require('./img/exit.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.headerRightMenu}>
            <TouchableOpacity><Image style={[styles.headerImg,{marginRight:10}]}
              source={require('./img/chart.png')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={this._openModalMenu}><Image style={styles.headerImg}
              source={require('./img/menu.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.container}>
          
          <Modal
            animated={true}
            transparent={true}
            visible={this.state.modalShow}>
            <View style={styles.modalContainer}>
              <View style={styles.modalMenu}>
                <TouchableOpacity style={styles.modalMenuItem}>
                  <Text>关闭广告</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalMenuItem}>
                  <Text>    设置    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._closeModalMenu} style={[styles.modalMenuItem,{borderBottomWidth:0}]}>
                  <Text>取消</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={{flex:1}}> {this.props.router.passProps.title}</Text>
          <TouchableHighlight underlayColor='#99d9f4' onPress={this.onClickHandler.bind(this)} style={styles.button}><Text style={{color:'white'}}>跳</Text></TouchableHighlight>
        </View>
        </View>
    else
      content = <Sign />

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
          main: { opacity:1.0 },
        }
      }}

      //写入回调方法,从子组件回调方法中获取的入参名字为‘id’，将它作为参数传递给方法onMenuClickCallBack
      //
      // 从子页面传递来的参数，见MenuItem.js中的       //   这里是要传递到本页面处理函数onMenuClickCallBack的参数,
      // <TouchableOpacity style={styles.menuItem} //   这里传递的是一个对象，对象名随意，在onMenuClickCallBack
      // onPress= {() => this.props.callBack       //   函数中用args来代替了，取其中id的值就是args.id。如果只需要传递
      // (this.props.id)}>                         //   一个值的话，写成=> {this.onMenuClickCallBack(id)}}/>}
      // 这里是一个，如果是对象的话传递时会采取：        //   就可以了，在onMenuClickCallBack函数中，args的值就是传递的
      // <TouchableOpacity style={styles.menuItem} //   id的值。
      // onPress= {() => this.props.callBack       //               ||
      // ({id:id,name:name,...})}>的形式，          //               ||
      // 取值时就应该写<Menu callBack={(params.id)=> //               ||
      //                        ||                                  ||
      //                        ||                                  ||
      content={<Menu callBack={(id) => {this.onMenuClickCallBack({id:id})}} selectId={this.state.menuSelectedId}/>}
      >
      {content}  
    </Drawer>           
      );
    }
  });


var styles = StyleSheet.create({
  container:{
    padding:30,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#0085C4',
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
    backgroundColor: '#005dd5',
    borderBottomWidth:1,
    borderBottomColor:'#00aaaaaa',
    flexDirection:'row',
  },
  headerLeftMenu:{
    flex:1,
    justifyContent:'flex-start',
    paddingTop:16,
    paddingLeft:6,
  },
  headerRightMenu:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
    paddingTop:16,
    paddingRight:6,
  },
  headerImg:{
    width:40,
    height:40,
  },
  modalContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  modalMenu:{
    alignItems:'center',
    justifyContent:'center',
    width:70,
    height:140,
    marginTop:60,
    backgroundColor:'#FFFFFF',
  },
  modalMenuItem:{
    flex:1,
    justifyContent:'center',
    borderBottomColor:'#dddddd',
    borderBottomWidth:1,
  },
});

module.exports = Main;