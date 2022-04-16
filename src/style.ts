export default `
.spcks-section {
  clear: both;
  padding: 15px 0 0 15px;
}

.spcks-label {
  color: #444;
  font: bold 13px Helvetica Neue,Helvetica,Arial,sans-serif;
  padding: 4px 3px 6px;
}

ul.spcks-ul {
  padding: 0;
  list-style-type: none;
  margin: 0;
  user-select: none;
}

ul.spcks-ul li {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0,0,0,.2);
  cursor: pointer;
  display: block;
  float: left;
  height: 100px;
  margin: 0 15px 15px 0;
  overflow: hidden;
  padding: 0;
  position: relative;
  transition: all .3s linear;
  width: 130px;
}

ul.spcks-ul li:hover {
  box-shadow: 0 0 7px 0 #555;
}

ul.spcks-ul li.spcks-active {
  box-shadow: 0 0 0 3px #426698, 0 0 4px 6px hsla(0,0%,100%,.3);
}

.spcks-preview {
  background: #e3e3e3;
  background-size: cover;
  height: 70px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spcks-meta {
  color: #555;
  background: #fff;
  border-radius: 0 0 4px 4px;
  height: 30px;
  padding: 2px 25px 0 5px;
  position: relative;
  z-index: 2;
}

.spcks-active .spcks-meta {
  background: #426698;
  color: #fff;
}

.spcks-name {
  display: block;
  font-size: 9px;
  font-weight: 700;
  line-height: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.spcks-select {
  bottom: 9px;
  right: 9px;
  position: absolute;
  width: 12px;
  height: 12px;
  border: 1px solid #ddd;
  border-radius: 1px;
}

.spcks-active .spcks-select {
  border-color: #fff;
}

.spcks-active .spcks-select:after {
  color: #426698;
  content: '';
  display: block;
  filter: drop-shadow(1px 0) drop-shadow(-0.7px -0.7px);
  position: relative;
  box-sizing: border-box;
  width: 6px;
  height: 12px;
  top: -3px;
  left: 3.5px;
  border: solid #fff;
  border-width: 0 2.5px 2.5px 0;
  transform: rotate(45deg);
}
`;
