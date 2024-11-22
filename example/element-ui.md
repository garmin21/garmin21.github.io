## 如何自定义 table 的 empty 空内容

```css
.el-table__empty-block{
  background-image: url("../images/none.svg") !important;
  background-repeat: no-repeat;
  background-position: center;
  width: 310px !important;
  height: 238px !important;
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  padding-bottom: 40px;
}
.el-table__empty-text {
  display: none !important;
}
```