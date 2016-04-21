'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var Swiper = require('react-native-swiper')


var Constants = require('./Constants');
var Utils = require('./Utils');
var ReadFoot = require('./ReadFoot');

var {
  Image,
  StyleSheet,
  TextInput,
  PixelRatio,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  StatusBar,
  Modal,
  ScrollView,
} = React;

var sessid;

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

var ReadMain = React.createClass({

  getInitialState:function(){
    return({
      modalVisible:false,
      //已选择的菜单id,判断是否存在，如果不存在 说明是第一次进来，设置为1
      menuSelectedId:1,
      bookIndex:0,
      controlIndex:0,
      bookPlan:[], //查询到的在当前用户阅读计划中的书籍列表，默认是空的 book列表
      // currentBook:{},//当前已选择书籍的信息 book对象
      readInfo:{},//点击选项卡后查询当前书籍的阅读信息 readHistory对象
    });
  },

  componentWillMount:function(){
    //获取本地保存的sessionid
    Utils.getSessionId(
      function(data){
        sessid = data;
      }
    );
  },

  componentDidMount:function(){
    StatusBar.setBarStyle(1);
    
    //获取阅读计划信息
    fetch(Constants.URL+'/read/book/queryReadPlan',
          {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'post',
          body: JSON.stringify({
              'sessionid':sessid,
              'type':'ios'
          })
      })
      //这里不用转换，根据后台返回的值来定
      .then((response) => response.json())
      .then((json) => {this._getReadPlanHandler(json)})
      .catch((error) => {
        alert("获取书籍信息失败，请稍后再试");
      });
  },

  //获取阅读计划返回的操作
  _getReadPlanHandler:function(json){   //成功 
     this.setState({
        //读书计划列表状态初始化
        bookPlan : json,
        // //默认选择的当前选择书籍为第一本
        // currentBook:json[0],
      });
  },

  //点击菜单选择相应页面
  onMenuClickCallBack:function(menuId){
      this.props.navigator.replace({
        name: '',
        id: menuId,          
        //跳转到main页面（routeid为1） 然后传递最新点击的菜单id过去选中，同时菜单id也决定页面中显示内容的不同 render方法中做判断
        passProps:{
          menuSelectedId:menuId
        },
      });
  },

  //切换书籍的时候调用
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

  //获取当前书籍的阅读信息
  //
  getCurrentReadInfo:function(){
    //获取当前书籍的阅读信息
    fetch(Constants.URL+'/read/book/getReadInfo',
          {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'post',
          body: JSON.stringify({
              'sessionid':sessid,
              'type':'ios',
              'douban_id':this.state.bookPlan[this.state.bookIndex].douban_id,
          })
      })
      //这里不用转换，根据后台返回的值来定
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          readInfo:json
        });
      })
      .catch((error) => {
        alert("获取阅读信息失败，请稍后再试");
      });
    },

  //选择书籍滑动后的操作,swiper滑动控件当前页变化，同时保存当前书籍信息
  _onMomentumScrollEnd: function (e, state, context) {
    // bookIndex = state.index;
    this.setState({
      bookIndex:state.index
    });
  },

//选择操作滚动
  _scrollControl: function (e, state, context) {
    this.setState({
      controlIndex:state.index
    });
  },

  render: function() {
    //阅读计划列表
    var planBooks = [];
    let bookPlan = this.state.bookPlan;

    for(let i=0;i<bookPlan.length;i++){
      planBooks.push(
          <View key={bookPlan[i].douban_id} style={styles.slide} title={<Text numberOfLines={1}></Text>}>
            <Image style={styles.image} source={{uri: bookPlan[i].image_url}} >
            </Image>
            
            <View style={styles.imageButtonView}> 
              <TouchableOpacity style={[styles.imageButton,{backgroundColor:'rgba(45,188,86,0.8)',}]}>
                <Text style={styles.text}>启读</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.imageButton,{backgroundColor:'rgba(119,188,86,0.8)',}]} onPress={()=>{this.setState({menuSelectedId:'2',modalVisible:true});}}>
                <Text style={styles.text}>书签</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.imageButton,{backgroundColor:'rgba(219,86,86,0.8)',}]} onPress={()=>{this.setState({menuSelectedId:'3',modalVisible:true});}}>
                <Text style={styles.text}>书评</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.imageButton,{backgroundColor:'rgba(19,188,167,0.8)',}]}>
                <Text style={styles.text}>毕读</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.imageButton,{backgroundColor:'rgba(111,88,67,0.8)',}]} onPress={()=>{this.setState({menuSelectedId:'5',modalVisible:true});}}>
                <Text style={styles.text}>推荐</Text>
              </TouchableOpacity>
            </View>
          </View>

        );
    }


    {/*loop一定要为false否则index设置不起效果，2的一比*/}
    var content;
    if(this.state.bookPlan.length > 0){
      content = (
        <View style={{backgroundColor: 'rgba(219,188,86,0.1)'}}> 
        <Swiper style={styles.wrapper} height={screenHeight-120} index={this.state.bookIndex}
          renderPagination={this.renderPagination} onMomentumScrollEnd = {this._onMomentumScrollEnd}
          paginationStyle={{
            bottom: -23, left: null, right: 10,
          }} loop={false}> 
          {planBooks}
        </Swiper>



        </View>
        );
      }
      else {
        content = (
            <View style={styles.slide5}>
              <Text style={styles.text}>
                暂无阅读计划
              </Text>
            </View>
          );
      }

    //弹出框内容
    var modalView;

    if(this.state.menuSelectedId === '0')
      modalView = (<View></View>);
    else if(this.state.menuSelectedId === '2'){
      modalView = 
        <View style={styles.slide2}>
            <TouchableOpacity style={{flexDirection:'row',width:160,height:50,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(119,188,86,0.8)',borderRadius:25}}>
              <Image style={{width:30,height:30,marginRight:10,tintColor:'#FFFFFF'}} 
                source={require('../img/tag.png')} resizeMode={'contain'}/>
              <Text style={styles.text}>书签</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#FFFFFF',width:60,height:60,borderRadius:30,alignItems:'center',
              justifyContent:'center',bottom:10,left:screenWidth/2-30,position:'absolute'}} onPress={()=>{this.setState({modalVisible:false,menuSelectedId:0});}}>
              <Text>关闭</Text>
            </TouchableOpacity>
        </View>
      }
      else if(this.state.menuSelectedId === '3'){
      modalView = 
        <View style={styles.slide3}>
            <TouchableOpacity style={{flexDirection:'row',width:160,height:50,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(197,86,86,0.8)',borderRadius:25}}>
              <Image style={{width:30,height:30,marginRight:10,tintColor:'#FFFFFF'}} 
                source={require('../img/comment.png')} resizeMode={'contain'}/>
              <Text style={styles.text}>书评</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#FFFFFF',width:60,height:60,borderRadius:30,alignItems:'center',
              justifyContent:'center',bottom:10,left:screenWidth/2-30,position:'absolute'}} onPress={()=>{this.setState({modalVisible:false,menuSelectedId:0});}}>
              <Text>关闭</Text>
            </TouchableOpacity>
        </View>
      }
      else if(this.state.menuSelectedId === '5'){
      modalView = 
        <View style={styles.slide5}>
            <TouchableOpacity style={{flexDirection:'row',width:160,height:50,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(111,88,67,0.8)',borderRadius:25}}>
              <Image style={{width:30,height:30,marginRight:10,tintColor:'#FFFFFF'}} 
                source={require('../img/share.png')} resizeMode={'contain'}/>
              <Text style={styles.text}>推荐</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#FFFFFF',width:60,height:60,borderRadius:30,alignItems:'center',
              justifyContent:'center',bottom:10,left:screenWidth/2-30,position:'absolute'}} onPress={()=>{this.setState({modalVisible:false,menuSelectedId:0});}}>
              <Text>关闭</Text>
            </TouchableOpacity>
        </View>
      }
  
    //弹出框
    var modal;
    modal=
      <Modal
          animated={true}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
          > 
          {modalView}
      </Modal>;

   return (
    <View style={{flex:1}}>

      <View style={ styles.header }>
        <View style={styles.headerLeftMenu}>
            <TouchableOpacity><Image style={styles.headerImg}
              source={require('../img/head_icon_scan.png')} resizeMode={'contain'}/>
            </TouchableOpacity>
          </View>
        <Image style={{height:20,marginBottom:12}} source={require('../img/logo.png')} resizeMode={'contain'}/>

        <View style={styles.headerRightMenu}>
            <TouchableOpacity><Image style={styles.headerImg}
              source={require('../img/head_icon_share.png')} resizeMode={'contain'}/>
            </TouchableOpacity>
          </View>
      </View>


      <View style={styles.container}>
        {modal}
        {content}

      </View>

      <ReadFoot callback={(menuId)=>{this.onMenuClickCallBack(menuId)}} selectedId={this.state.menuSelectedId}>
      </ReadFoot>

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

  

  wrapper: {
  },
  slide: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: 'transparent',
    paddingTop:50,
    paddingBottom:50,
    paddingLeft:6 
    // marginLeft: ((screenHeight-120)/screenHeight * screenWidth - screenWidth)/2
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    height:screenHeight-220,
    // width:(screenHeight-160)/screenHeight * screenWidth,
    width:(screenHeight-220)*2/3,
  },
  imageButtonView:{
    flexDirection:'column',
    marginTop:12,
  },
  imageButton:{
    flex:1,
    // width:screenWidth - (screenHeight-160)/screenHeight * screenWidth - 6 - 6,
    width:screenWidth - (screenHeight-220)*2/3 - 6 - 6,
    marginBottom:12,
    justifyContent:'center',
    alignItems:'center'
  },

  secondSwiper:{
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(153,204,0,1)',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(153,204,255,1)',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(250,128,114,1)',
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(143,188,143,1)',
  },
  slide5: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,105,180,1)',
  }
});

module.exports = ReadMain;