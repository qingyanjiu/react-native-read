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
        bottom: 0,
        right: 10,
      }}>
        <Text><Text style={{
          color: '#007aff',
          fontSize: 20,
        }}>{index + 1}</Text>/{total}</Text>
      </View>
    )
  },


  render: function() {
    var books = [];
    for(var i=0;i<4;i++){
      books.push(
        
        );
    }


   return (
    <View style={{flex:1,justifyContent:'center',}}>

      <View style={ styles.header }>
        <View style={styles.headerLeftMenu}>
            <TouchableOpacity><Image style={styles.headerImg}
              source={require('./img/head_icon_scan.png')} resizeMode={'contain'}/>
            </TouchableOpacity>
          </View>
        <Image style={{height:20,marginBottom:12}} source={require('./img/logo.png')} resizeMode={'contain'}/>
        <View style={styles.headerRightMenu}>
            <TouchableOpacity onPress={this.props.openModalCallBack}><Image style={styles.headerImg}
              source={require('./img/head_icon_share.png')} resizeMode={'contain'}/>
            </TouchableOpacity>
          </View>
      </View>


      <View style={styles.container}>
        <Swiper style={styles.wrapper} height={Dimensions.get('window').height/2-120} 
          renderPagination={this.renderPagination}
          paginationStyle={{
            bottom: -23, left: null, right: 10,
          }} loop={true}>
          <View style={styles.slide} title={<Text numberOfLines={1}></Text>}>
            <Image style={styles.image} source={{uri: 'https://img1.doubanio.com/lpic/s1763397.jpg'}} resizeMode={'contain'}/>
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}></Text>}>
            <Image style={styles.image} source={{uri: 'https://img3.doubanio.com/lpic/s26686524.jpg'}} resizeMode={'contain'}/>
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}></Text>}>
            <Image style={styles.image} source={{uri: 'https://img1.doubanio.com/lpic/s3193158.jpg'}} resizeMode={'contain'}/>
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}></Text>}>
            <Image style={styles.image} source={{uri: 'https://img1.doubanio.com/lpic/s1446358.jpg'}} resizeMode={'contain'}/>
          </View>
        </Swiper>

        <Swiper style={styles.secondSwiper} height={Dimensions.get('window').height/2} horizontal={false} autoplay={false} loop={true}>
          <View style={styles.slide1}>
            <Text style={styles.text}>启读</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>书签</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>书评</Text>
          </View>
          <View style={styles.slide4}>
            <Text style={styles.text}>毕读</Text>
          </View>
          <View style={styles.slide5}>
            <Text style={styles.text}>分享</Text>
          </View>
        </Swiper>

      </View>

      <View style={ styles.footer }>
          <View style={styles.footerItem}>
            <TouchableOpacity style={styles.footerMenu}>
              <Image style={styles.footerImg} source={require('./img/foot_icon_home.png')}>
              </Image>
              {/*<Text style={{fontSize:10,paddingTop:4,color:'#FFFFFF'}}>乐读主页</Text>*/}
            </TouchableOpacity>
          </View>
          <View style={styles.footerItem}>
            <TouchableOpacity style={styles.footerMenu}>
              <Image style={styles.footerImg} source={require('./img/foot_icon_search.png')}>
              </Image>
              {/*<Text style={{fontSize:10,paddingTop:4,color:'#FFFFFF'}}>查找书籍</Text>*/}
            </TouchableOpacity>
          </View>
          <View style={styles.footerItem}>
            <TouchableOpacity onPress={this.props.openModalCallBack} style={styles.footerMenu}>
              <Image style={styles.footerImg} source={require('./img/foot_icon_plan.png')}>
              </Image>
              {/*<Text style={{fontSize:10,paddingTop:4,color:'#FFFFFF'}}>乐读计划</Text>*/}
            </TouchableOpacity>
          </View>
          <View style={styles.footerItem}>
            <TouchableOpacity onPress={this.props.openModalCallBack} style={styles.footerMenu}>
              <Image style={styles.footerImg} source={require('./img/foot_icon_history.png')}>
              </Image>
              {/*<Text style={{fontSize:10,paddingTop:4,color:'#FFFFFF'}}>乐读历史</Text>*/}
            </TouchableOpacity>
          </View>
      </View>

    </View>
      );
    },

  });


var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF',
  },
  
  modalContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  header: {
    height: 60,
    backgroundColor: 'rgba(219,188,86,0.8)',
    borderBottomWidth:0,
    flexDirection:'row',
    marginBottom:1,
    justifyContent:'center',
    alignItems:'flex-end'
  },
  headerLeftMenu:{
    flex:1,
    justifyContent:'flex-start',
  },
  headerRightMenu:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  headerImg:{
    height:34,
    marginBottom:4,
  },

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
  footerItem:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  footerMenu:{
    flexDirection:'column',
    alignItems:'center',
  },

  wrapper: {
    marginBottom:1,
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
  },

  secondSwiper:{
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(153,204,0,0.4)',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(153,204,255,0.4)',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(250,128,114,0.4)',
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(143,188,143,0.4)',
  },
  slide5: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,105,180,0.4)',
  }
});

module.exports = ReadMain;