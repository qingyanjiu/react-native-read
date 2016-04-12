'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var Swiper = require('react-native-swiper')

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
  Modal,
  ScrollView,
} = React;


var ReadMain = React.createClass({


  componentDidMount:function(){
    StatusBarIOS.setStyle(1);
  },

  getInitialState:function(){
    return({
      //已选择的菜单id,判断是否存在，如果不存在 说明是第一次进来，设置为1
      menuSelectedId:this.props.router.passProps.menuSelectedId ? this.props.router.passProps.menuSelectedId:'1',
      modalShow:false,
      currentPage: 0
    });
  },

  onMenuClickCallBack:function(args){
    // alert(
    //   args.id
    // );

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


  renderPagination :function (index, total, context) {
    return (
      <View style={{
        position: 'absolute',
        bottom: -25,
        right: 10,
      }}>
        <Text><Text style={{
          color: '#FFFFFF',
          fontSize: 20,
        }}>{index + 1}</Text>/{total}</Text>
      </View>
    )
  },


  render: function() {
    var books = [];
    for(var i=0;i<4;i++){
      books.push(
        <View style={{width:Dimensions.get('window').width,  height:Dimensions.get('window').height/3,backgroundColor:'rgba(255,255,255,0.6)'}}>
          
        </View>
        );
    }


   return (
    <View style={{flex:1,justifyContent:'center',}}>
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

            <TouchableOpacity onPress={this.props.openModalCallBack}><Image style={styles.headerImg}
              source={require('./img/menu.png')}/>
            </TouchableOpacity>
          </View>
      </View>


      <View style={styles.container}>
        <Swiper style={styles.wrapper} height={240} 
          renderPagination={this.renderPagination}
          paginationStyle={{
            bottom: -23, left: null, right: 10,
          }} loop={true}>
          <View style={styles.slide} title={<Text numberOfLines={1}>第一本书</Text>}>
            <Image style={styles.image} source={{uri: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'}} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
            <Image style={styles.image} source={{uri: 'http://a.hiphotos.baidu.com/image/w%3D310/sign=4459912736a85edffa8cf822795509d8/bba1cd11728b4710417a05bbc1cec3fdfc032374.jpg'}} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
            <Image style={styles.image} source={{uri: 'http://e.hiphotos.baidu.com/image/w%3D310/sign=9a8b4d497ed98d1076d40a30113eb807/0823dd54564e9258655f5d5b9e82d158ccbf4e18.jpg'}} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            <Image style={styles.image} source={{uri: 'http://e.hiphotos.baidu.com/image/w%3D310/sign=2da0245f79ec54e741ec1c1f89399bfd/9d82d158ccbf6c818c958589be3eb13533fa4034.jpg'}} />
          </View>
        </Swiper>
      </View>
    </View>
      );
    },

  });


var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#0085C4',
  },
  
  modalContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  header: {
    height: 60,
    backgroundColor: '#005dd5',
    borderBottomWidth:1,
    borderBottomColor:'#00aaaaaa',
    flexDirection:'row',
    marginBottom:1,
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

  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
  }
});

module.exports = ReadMain;