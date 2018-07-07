import React from 'react';

import {
  Toolbar,
  BackButton
} from 'react-onsenui';

const NavApp = ({title, navigator, backButton}) => (
  <Toolbar>
    <div className='left'>
      {backButton ? <BackButton onClick={() => navigator.popPage()}>返回</BackButton> : null}
    </div>
    <div className='center'>{title}</div>
  </Toolbar>
);

export default NavApp;
