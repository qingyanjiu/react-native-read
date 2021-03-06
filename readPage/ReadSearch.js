'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var GiftedListView = require('react-native-gifted-listview');

var Constants = require('./Constants');
var Utils = require('./Utils');
var ReadFoot = require('./ReadFoot');

import BarcodeScanner from 'react-native-barcode-scanner-universal';
import Share from 'react-native-share';


var {
  Image,
  StyleSheet,
  TextInput,
  View,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  StatusBar,
  Modal,
  PickerIOS,
  AlertIOS
} = React;

var PickerItemIOS = PickerIOS.Item;

var sessid;

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // assumes immutable objects

var mydate = new Date();
var year = mydate.getFullYear();
var month = mydate.getMonth();

var MONTHS_THIS_YEAR = [];
for(let i=month+1;i<=12;i++){
  MONTHS_THIS_YEAR.push(i.toString());
}

var ReadSearch = React.createClass({


  getInitialState:function(){
    return({
      text:'',
      searchText:'',
      page:1,
      menuSelectedId:this.props.menuSelectedId,
      modalVisible:false,
      modalType:'1', //弹出框类型 1-查询框 2-点击列表想的日期选择框
      bookName:'',//当前选中的书名
      month:(month+1).toString(),//选中的月份
      selectedBook:{},
      scanedBook:{},//扫码后获得的书籍信息
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
    
  },


  //后退按钮，暂时没用上
  onBackClickHandler:function(){   
      this.props.navigator.pop();
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

  /**
   * Will be called when refreshing
   * Should be replaced by your own logic
   * @param {number} page Requested page to fetch
   * @param {function} callback Should pass the rows
   * @param {object} options Inform if first load
   */
  _onFetch(page = this.state.page, callback, options) {
      //查询书籍列表信息
      fetch(Constants.URL+'/read/book/search',
            {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
                'sessionid':sessid,
                'type':'ios',
                'text':this.state.searchText,
                'page': page
            })
        })
        //这里不用转换，根据后台返回的值来定
        .then((response) => response.json())
        .then((json) => {
          if(json.result === 'expired'){
            AlertIOS.alert(
                 '注意',
                 '登录已过期，请重新登录'
            );
            //返回登录界面
            this.props.navigator.replace({
              name: '',
              id: 0         
            });
          }
          else{
            var rows = json.books;
            if (page === Math.ceil(json.total/10)) {
              callback(rows, {
                allLoaded: true, // the end of the list is reached
              });        
            } else {
              callback(rows);
            }
          }
        })
          .catch((error) => {
            AlertIOS.alert(
             '错误',
             '获取书籍信息失败，请重试'
            );
          });  
    },


  /**
   * When a row is touched
   * @param {object} rowData Row data
   */
  _onPress(rowData) {
    this.setState({
      bookName:rowData.title,
      modalType:'2',
      modalVisible:true,
      selectedBook:rowData,
    });
  },

  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderRowView(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#c8c7cc'
        onPress={() => this._onPress(rowData)}
        >  
        <View style={customStyles.row} key={rowData.id}>
          <Image style={{height:120,width:90,marginLeft:10}} source={{uri: rowData.images.large}}> 
          </Image>
          <View style={{flexDirection:'column',alignItems:'flex-start',justifyContent:'center',marginLeft:20}}>
            <Text style={{width:screenWidth-120,fontSize:20,paddingBottom:6,flexWrap:'wrap'}}>{rowData.title}</Text> 
            <Text style={{width:screenWidth-120,fontSize:12,paddingBottom:6,flexWrap:'wrap'}}>{rowData.author}</Text>
            <Text style={{fontSize:10,}}>豆瓣评分:{rowData.rating.average}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderSectionHeaderView(sectionData, sectionID) {
    return (
      <View style={customStyles.header}>
        <Text style={customStyles.headerTitle}>
          {sectionID}
        </Text>
      </View>
    );
  },
  
  /**
   * Render the refreshable view when waiting for refresh
   * On Android, the view should be touchable to trigger the refreshCallback
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderRefreshableWaitingView(refreshCallback) {
    if (Platform.OS !== 'android') {
      return (
        <View style={customStyles.refreshableView}>
          <Text style={customStyles.actionsLabel}>
            ↓
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableHighlight 
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
          style={customStyles.refreshableView}
        >
          <Text style={customStyles.actionsLabel}>
            ↻
          </Text>
        </TouchableHighlight>
      );
    }
  },

  /**
   * Render the refreshable view when the pull to refresh has been activated
   * @platform ios
   */
  _renderRefreshableWillRefreshView() {
    return (
      <View style={customStyles.refreshableView}>
        <Text style={customStyles.actionsLabel}>
          ↻
        </Text>
      </View>
    );
  },

  /**
   * Render the refreshable view when fetching
   */
  _renderRefreshableFetchingView() {
    return (
      <View style={customStyles.refreshableView}>
        <GiftedSpinner />
      </View>
    );
  },
  
  /**
   * Render the pagination view when waiting for touch
   * @param {function} paginateCallback The function to call to load more rows
   */
  _renderPaginationWaitingView(paginateCallback) {
    return (
      <TouchableHighlight 
        underlayColor='#c8c7cc'
        onPress={paginateCallback}
        style={customStyles.paginationView}
      >
        <Text style={[customStyles.actionsLabel, {fontSize: 13}]}>
          点我查看更多结果
        </Text>
      </TouchableHighlight>
    );
  },
  
  /**
   * Render the pagination view when fetching
   */
  _renderPaginationFetchigView() {
    return (
      <View style={customStyles.paginationView}>
        <GiftedSpinner />
      </View>
    );
  },
  
  /**
   * Render the pagination view when end of list is reached
   */
  _renderPaginationAllLoadedView() {
    return (
      <View style={customStyles.paginationView}>
        <Text style={customStyles.actionsLabel}>
          已经没有啦
        </Text>
      </View>
    );
  },
  
  /**
   * Render a view when there is no row to display at the first fetch
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderEmptyView(refreshCallback) {
    return (
      <View style={customStyles.defaultView}>
        <Text style={customStyles.defaultViewTitle}>
          没有找到结果~
        </Text>
        
        <TouchableHighlight 
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
        >
          <Text>
            ↻
          </Text>
        </TouchableHighlight>
      </View>
    );
  },
  
  /**
   * Render a separator between rows
   */
  _renderSeparatorView() {
    return (
      <View style={customStyles.separator} />
    );
  },

  //添加到阅读列表
  addToReadPlan:function(){
    fetch(Constants.URL+'/read/book/addReadPlan',
            {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
                'sessionid':sessid,
                'type':'ios',
                'month':this.state.month,
                'callData':this.state.selectedBook,
            })
        })
        //这里不用转换，根据后台返回的值来定
        .then((response) => response.json())
        .then((json) => {
          if(json.result === 'success'){
            AlertIOS.alert(
             '成功',
             '添加到阅读计划成功!'
            );
          }
          else if(json.result === 'exist'){
            AlertIOS.alert(
             '失败',
             '已经存在于阅读计划中!'
            );
          }
          else if(json.result === 'expired'){
            AlertIOS.alert(
                 '注意',
                 '登录已过期，请重新登录'
            );
            //返回登录界面
            this.props.navigator.replace({
              name: '',
              id: 0         
            });
          }
          })
          .catch((error) => {
            AlertIOS.alert(
             '错误',
             '添加阅读计划失败，请重试'
            );
    });
  },


  //点击扫描条码的按钮
  openScan:function(){
    this.setState({modalVisible:true,modalType:'-1'})
  },

  //扫码成功后操作
  readBarCode:function(code){
    //如果是条码
    if(code.type.indexOf('EAN_13') != -1 || code.type.indexOf('EAN-13') != -1){
      //通过扫描到的isbn码获取图书信息
      fetch('https://api.douban.com/v2/book/isbn/'+code.data+"?fields=id,title,images,summary,author,rating",
            {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'get',
        })
        //这里不用转换，根据后台返回的值来定
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            scanedBook:json,
            modalType:'-2',
          });
        })
        .catch((error) => {
          AlertIOS.alert(
             '错误',
             '获取书籍信息失败，请重试'
            );
          //最后关闭扫码框
          this.setState({modalVisible:false,modalType:0});
        });
    }
    else{
      AlertIOS.alert(
        '注意',
        '无法识别，请扫描书背面右下角的条码'
      );
      //最后关闭扫码框
      this.setState({modalVisible:false,modalType:0});
    }
    
  },

  //添加到阅读计划中
  // addScanToReadPlan:function(){
  //   fetch(Constants.URL+'/read/book/addReadPlan',
  //           {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           method: 'post',
  //           body: JSON.stringify({
  //               'sessionid':sessid,
  //               'type':'ios',
  //               'month':this.state.month,
  //               'callData':this.state.scanedBook,
  //           })
  //       })
  //       //这里不用转换，根据后台返回的值来定
  //       .then((response) => response.json())
  //       .then((json) => {
  //         if(json.result === 'success'){
  //           AlertIOS.alert(
  //            '成功',
  //            '添加到阅读计划成功!'
  //           );
  //         }
  //         else if(json.result === 'exist'){
  //           AlertIOS.alert(
  //            '失败',
  //            '已经存在于阅读计划中!'
  //            );
  //          }
  //          else if(json.result === 'expired'){
  //               AlertIOS.alert(
  //                    '注意',
  //                    '登录已过期，请重新登录'
  //               );
  //           }
  //         })
  //         .catch((error) => {
  //           AlertIOS.alert(
  //            '错误',
  //            '添加阅读计划失败，请重试'
  //           );
  //   });
  // },

  //分享
  onShare:function() {
    Share.open({
      share_text: "我在用这个读书管理软件！",
      share_URL: "http://alaien-book.daoapp.io/", 
      title: "分享",
    },(e) => {
      console.log(e);
    });
  },


  render: function() {
  //弹出框内容
    var modalView;
    if(this.state.modalVisible){
      if(this.state.menuId === '0'){
        modalView = (<View></View>);
      }
      //搜索界面弹出框
      if(this.state.modalType === '1')
        modalView = 
          <View style={styles.modal}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <TextInput style={styles.inputs} placeholder={'请输入书名'} textAlign={'center'} onChangeText={(text) => this.setState({text:text})} value={this.state.text} autoFocus={true}>
              </TextInput>

              <TouchableOpacity style={styles.button} onPress={()=>{this.setState({searchText:this.state.text,modalVisible:false});}}>
                <Image source={require('../img/search.png')} style={{width:26,height:30,tintColor:'rgba(255,255,255,0.6)'}} resizeMode={'contain'}/>
              </TouchableOpacity>

            </View>
              <TouchableOpacity style={{backgroundColor:'#FFFFFF',width:60,height:60,borderRadius:30,alignItems:'center',
                justifyContent:'center',bottom:10,left:screenWidth/2-30,position:'absolute'}} onPress={()=>{this.setState({modalVisible:false,modalType:0});}}>
                <Text>关闭</Text>
              </TouchableOpacity>
          </View>
          //加入阅读计划弹出框
        else if(this.state.modalType === '2')
          modalView = 
          <View style={[styles.modal,{marginTop:20,backgroundColor:'rgba(255,255,255,1)',justifyContent:'center'}]}>
            <View style={{flexDirection:'row'}}>
              <Text style={{flex:1}}>《{this.state.bookName}》</Text>
            </View>
            
            <PickerIOS style={{width:100}}
              selectedValue={this.state.month}
              onValueChange={(month) => this.setState({month: month})}>
              {MONTHS_THIS_YEAR.map((month) => ( 
                <PickerItemIOS
                  key={month}
                  value={month}
                  label={month+'月'}
                  />

              ))}
            </PickerIOS>

            <TouchableOpacity style={{backgroundColor:'rgba(45,188,20,0.8)',width:140,height:40,borderRadius:20,alignItems:'center',
                justifyContent:'center'}} onPress={()=>{this.addToReadPlan()}}>
                <Text style={{color:'#FFFFFF'}}>加入该月读书计划</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#DDDDDD',width:60,height:60,borderRadius:30,alignItems:'center',
                justifyContent:'center',bottom:10,left:screenWidth/2-30,position:'absolute'}} onPress={()=>{this.setState({modalVisible:false,modalType:0});}}>
                <Text>关闭</Text>
            </TouchableOpacity>
          </View>

        //弹出的条码扫描框
        else if(this.state.modalType === '-1'){

          modalView = 
          <View style={styles.camera}>
            <View>
                <Text style={{marginTop:-60,fontSize:20}}>请扫描书背后的条码</Text>
            </View>
            <BarcodeScanner
                onBarCodeRead={(code) => {this.readBarCode(code)}}
                style={{width:300,height:200}}>

            </BarcodeScanner>
            <TouchableOpacity style={{backgroundColor:'#888888',width:60,height:60,borderRadius:30,alignItems:'center',
                justifyContent:'center',bottom:10,left:screenWidth/2-30,position:'absolute'}} onPress={()=>{this.setState({modalVisible:false,modalType:0});}}>
                <Text style={{color:'#FFFFFF'}}>关闭</Text>
              </TouchableOpacity>
          </View>;
        }

        //扫描成功后的书籍展示框
        else if(this.state.modalType === '-2'){

          modalView = 
          <View style={styles.slide0}>
            <View style={{height: 100,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:20}}>
              <Image style={{height:100,width:76,marginLeft:10}} source={{uri: this.state.scanedBook.images.large}}> 
              </Image>
              <View style={{flexDirection:'column',alignItems:'flex-start',justifyContent:'center',marginLeft:20}}>
                <Text style={{width:screenWidth-120,fontSize:20,paddingBottom:6,flexWrap:'wrap'}}>{this.state.scanedBook.title}</Text> 
                <Text style={{width:screenWidth-120,fontSize:12,paddingBottom:6,flexWrap:'wrap'}}>{this.state.scanedBook.author}</Text>
                <Text style={{fontSize:10,}}>豆瓣评分:{this.state.scanedBook.rating.average}</Text>
              </View>
            </View>

            <PickerIOS style={{width:100,}}
                selectedValue={this.state.month}
                onValueChange={(month) => this.setState({month: month})}>
                {MONTHS_THIS_YEAR.map((month) => ( 
                  <PickerItemIOS
                    key={month}
                    value={month}
                    label={month+'月'}
                    />

                ))}
              </PickerIOS>

              <TouchableOpacity style={{backgroundColor:'rgba(45,188,20,0.8)',width:140,height:40,borderRadius:20,alignItems:'center',
                  justifyContent:'center'}} onPress={()=>{this.addScanToReadPlan()}}>
                  <Text style={{color:'#FFFFFF'}}>加入该月读书计划</Text>
              </TouchableOpacity>


            <TouchableOpacity style={{backgroundColor:'#888888',width:60,height:60,borderRadius:30,alignItems:'center',
                justifyContent:'center',bottom:10,left:screenWidth/2-30,position:'absolute'}} onPress={()=>{this.setState({modalVisible:false,modalType:0});}}>
                <Text style={{color:'#FFFFFF'}}>关闭</Text>
              </TouchableOpacity>
          </View>;
        }

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

  var content;
  //解决重新搜索后第一页内容不刷新的问题,只要输入新的搜索关键字,就重置页面
  if(this.state.text !== this.state.searchText)
    content = <View></View>
  else if(this.state.searchText !== '')
    content = (
      <GiftedListView
          rowView={this._renderRowView}
          enableEmptySections={true}

          onFetch={this._onFetch}
          initialListSize={10} // the maximum number of rows displayable without scrolling (height of the listview / height of row)

          firstLoader={true} // display a loader for the first fetching

          pagination={true} // enable infinite scrolling using touch to load more
          paginationFetchigView={this._renderPaginationFetchigView}
          paginationAllLoadedView={this._renderPaginationAllLoadedView}
          paginationWaitingView={this._renderPaginationWaitingView}

          refreshable={false} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          refreshableViewHeight={50} // correct height is mandatory
          refreshableDistance={200} // the distance to trigger the pull-to-refresh - better to have it lower than refreshableViewHeight
          refreshableFetchingView={this._renderRefreshableFetchingView}
          refreshableWillRefreshView={this._renderRefreshableWillRefreshView}
          refreshableWaitingView={this._renderRefreshableWaitingView}

          emptyView={this._renderEmptyView}

          renderSeparator={this._renderSeparatorView}

          withSections={false} // enable sections

          PullToRefreshViewAndroidProps={{
            colors: ['#fff'],
            progressBackgroundColor: '#003e82',
          }}
        ></GiftedListView>
    );
    else
      content = <View></View>

   return (
       <View style={{flex:1}}>

        <View style={ styles.header }>
          
          <View style={styles.headerLeftMenu}>

              <TouchableOpacity onPress={()=>{this.openScan()}}><Image style={styles.headerImg}
                source={require('../img/head_icon_scan.png')} resizeMode={'contain'}/>
              </TouchableOpacity>

          </View>


          <TouchableOpacity onPress={()=>{this.setState({modalVisible:true,modalType:'1'});}}>
            <View style={[styles.inputs,{marginBottom:6,width:160,height:32,borderRadius:16,flexDirection:'row',justifyContent:'center',alignItems:'center',borderWidth:2,borderColor:'rgba(255,255,255,0.8)'}]} textAlign={'center'} onChangeText={(text) => this.setState({text:text})} value={this.state.text}> 
              <Text>{this.state.searchText}</Text>
              <Image source={require('../img/search.png')} style={{width:18,height:22,tintColor:'rgba(219,188,86,1)',right:10,top:3,position:'absolute'}} resizeMode={'contain'}/>
            </View>
          </TouchableOpacity>

          <View style={styles.headerRightMenu}>
              <TouchableOpacity onPress={()=>{this.onShare()}}><Image style={styles.headerImg}
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
    }
  });


var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF',
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
  modal: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(153,204,255,1)',
  },
  inputs: {
    flex:4,
    height:32,
    width:200,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 0,
    borderColor: '#DDDDDD',
    borderRadius:16,
    marginTop:40,
  },
  button: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40,
    marginLeft:6
  },

  camera: {
    flex:1,
    marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  slide0: {
    flex: 1,
    marginTop:20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
  },
});

var customStyles = {
  separator: {
    height: 1,
    backgroundColor: '#CCC'
  },
  refreshableView: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsLabel: {
    fontSize: 20,
    color: '#007aff',
  },
  paginationView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  defaultView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  defaultViewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    height: 120,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  header: {
    backgroundColor: '#50a4ff',
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
  },
};

module.exports = ReadSearch;