import React from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
  AlertDialog,
  Input
} from 'react-onsenui';

import * as Actions from '../actions';

const AddLocationDialog = ({isOpen, actions}) => {
  let input;

  const handleButtonClick = () => {
    const node = findDOMNode(input);

    if (node.value.length > 0) {
      actions.addLocationAndFetchWeather(node.value);
      node.value = '';
      actions.closeDialog();
    };
  };

  return (
    <AlertDialog isOpen={isOpen} isCancelable={true} onCancel={actions.closeDialog}>
			<div className='alert-dialog-title'>新增一個地點</div>
			<div className='alert-dialog-content'>
				<Input
					modifier='underbar'
					ref={node => (input = node)}
					placeholder='地點名稱' float
        />
			</div>
			<div className='alert-dialog-footer'>
				<button onClick={actions.closeDialog} className='alert-dialog-button'>
					取消
				</button>
				<button onClick={handleButtonClick} className='alert-dialog-button'>
					確定
				</button>
			</div>
    </AlertDialog>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.dialog.open
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationDialog);
