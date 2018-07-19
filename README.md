let const, 
模板字符
展开运算符
Object.keys
箭头函数, react事件的绑定
装饰器，高阶函数HOC
async,await

## 2. react+ redux + react router
#### 2.1. react 
组件属性传递 生命周期 context 
#### 2.2. redux （dispatch, subscribe, createStore, getState）
reducer一个函数，对于传入事件的响应
actioncreator 简单的函数返回action
#### 2.3. react-redux 
(Provider, connect) 装饰器 mapStateToProps， mapDispatchToProps
#### 2.4. react router 
	BrowserRouter, 
	Route=> path
	Redirect => <Redirect to=>
	Switch => {
	<Route path='/'>
	<Route path='/path1'>
	}
    this.props.{location.history}
    @withRouter
#### 2.5 redux-thunk
    异步redux中间件
#### 2.6 中间件
    过来一个action，中间件链条所有的中间件都对这个action做出回应，继续传递，执行这个action
#### 2.7 调试
## 3. 