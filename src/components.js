import Vue from 'vue'
import {
  Alert,
  Button,
  Col,
  Checkbox,
  Descriptions,
  Dropdown,
  Empty,
  FormModel,
  Layout,
  List,
  Icon,
  Input,
  InputNumber,
  Menu,
  Radio,
  Result,
  Row,
  Select,
  Space,
  Switch,
  Spin,
  Tabs,
  Tag,
  Tooltip,
  Modal,
  notification
} from 'ant-design-vue'

Vue.use(Alert)
Vue.use(Button)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(Descriptions)
Vue.use(Dropdown)
Vue.use(Empty)
Vue.use(FormModel)
Vue.use(Layout)
Vue.use(List)
Vue.use(Icon)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Menu)
Vue.use(Radio)
Vue.use(Result)
Vue.use(Row)
Vue.use(Select)
Vue.use(Space)
Vue.use(Switch)
Vue.use(Spin)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(Modal)

// 挂载原型
Vue.prototype.$notice = notification
