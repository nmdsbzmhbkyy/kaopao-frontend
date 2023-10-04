import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { Button, NavBar, Icon, Tabbar, TabbarItem, Search,
    Divider, Tag, Popup, Cell, Field, CellGroup, TreeSelect,
    Col, Row , Card, List, Empty, Stepper, DatePicker,
    RadioGroup, Radio, FloatingBubble, Tab, Tabs,Switch, Dialog } from 'vant';
import router from "./router/router"

const app = createApp(App);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Button);
app.use(router);
app.use(Search);
app.use(Tag);
app.use(Divider);
app.use(Popup);
app.use(Cell);
app.use(Field);
app.use(CellGroup);
app.use(TreeSelect);//分类选择
app.use(Col);
app.use(Row);
app.use(Card);
app.use(List);
app.use(Empty);
app.use(Stepper);
app.use(DatePicker);
app.use(Radio);
app.use(RadioGroup);
app.use(FloatingBubble);
app.use(Tab);
app.use(Tabs);
app.use(Switch);
app.use(Dialog);
app.mount('#app');
