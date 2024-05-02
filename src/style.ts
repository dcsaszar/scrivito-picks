const BASE = css`
  .spcks-section {
    padding: 15px 0 0 15px;
  }

  .spcks-label {
    color: #272d37;
    font-size: 14px;
    font-weight: bold;
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
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    display: inline-block;
    height: 100px;
    margin: 0 15px 15px 0;
    overflow: hidden;
    padding: 0;
    position: relative;
    transition: all 0.3s linear;
    width: 130px;
  }

  ul.spcks-ul li:hover {
    box-shadow: 0 0 7px 0 #3a3453;
  }

  ul.spcks-ul li.spcks-active {
    box-shadow: 0 0 0 3px #426698, 0 0 4px 6px hsla(0, 0%, 100%, 0.3);
  }

  .spcks-preview {
    background: #e3e3e3;
    background-size: cover;
    height: 70%;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spcks-meta {
    color: #3a3453;
    background: #fff;
    border-radius: 0 0 4px 4px;
    height: 30%;
    padding: 2px 25px 0 5px;
    position: relative;
    z-index: 2;
  }

  .spcks-active .spcks-meta {
    background: #426698;
    color: #fff;
  }

  .spcks-name {
    font-size: 9px;
    font-weight: 700;
    left: 5px;
    line-height: 14px;
    overflow: hidden;
    position: absolute;
    right: 22px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spcks-select {
    bottom: calc(50% - 6px);
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
    content: "";
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

const DARK = css`
  body {
    background: #1d2229;
  }

  .spcks-section {
    padding: 5px 0 0 5px;
    zoom: 0.79;
  }

  ul.spcks-ul li {
    aspect-ratio: 13 / 10;
    background: #1d2229;
    box-shadow: 0 0 4px 1px rgb(0 0 0 / 10%);
    height: auto;
    margin: 0 3px;
    max-width: 185px;
    width: calc(100% / 2 - 7px);
  }

  @media screen and (min-width: 330px) {
    ul.spcks-ul li {
      width: calc(100% / 3 - 7px);
    }
  }

  @media screen and (min-width: 440px) {
    ul.spcks-ul li {
      width: calc(100% / 4 - 7px);
    }
  }

  @media screen and (min-width: 550px) {
    ul.spcks-ul li {
      width: calc(100% / 5 - 7px);
    }
  }

  @media screen and (min-width: 660px) {
    ul.spcks-ul li {
      width: calc(100% / 6 - 7px);
    }
  }

  ul.spcks-ul li:hover {
    box-shadow: 0 0 7px 0 #333;
    filter: brightness(1.2);
  }

  .spcks-label {
    color: #eee;
    margin: 0 5px;
    text-shadow: 0 1px 1px rgb(0 0 0 / 30%), 0 0 4px rgb(0 0 0 / 20%);
  }

  .spcks-preview {
    background: rgba(222, 222, 222, 0.2);
    color: #eee;
  }

  .spcks-preview:after {
    border: 3px solid transparent;
    border-bottom: none;
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  .spcks-meta {
    background: rgba(222, 222, 222, 0.1);
    color: #ccc;
  }

  .spcks-active .spcks-preview:after {
    border-color: #426698;
  }

  .spcks-active .spcks-meta {
    background: #426698;
  }

  .spcks-name {
    font-size: 15px;
    font-weight: normal;
    left: 7px;
    line-height: 20px;
  }

  ul.spcks-ul li.spcks-active {
    box-shadow: 0 0 4px 1px rgb(0 0 0 / 10%);
  }
`;

export const STYLE = { light: BASE, dark: BASE + DARK };

function css(s) {
  return s[0];
}
