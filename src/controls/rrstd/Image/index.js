import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actionCreators as userActionCreators } from 'redux/reducers/user';

// import addPhotoImg from 'assets/imgs/add-photo.svg';

import './styles.styl';


class CmpImage extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    uploadCommonImg: PropTypes.func.isRequired,
    avatar: PropTypes.any,
  }
  render() {
    const { uploadCommonImg, avatar = {}, id } = this.props;
    // console.log(avatar);
    return (
      <div className='upload-img'>
        <div className='upload-img__inner'>
          <div alt='Avatar' className={`upload-img__img ${ !avatar.url ? '_empty' : '' }`} />
          <div className='upload-img__input'>
            <input className='upload-img__input-field' type='file' onChange={(e) => {
              const data = new FormData();
              data.append('files[]', e.target.files[0]);
              uploadCommonImg(data, id);
            }} />
            <div className='upload-img__icon' />
            <div className='upload-img__text'>Upload</div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) =>
  // console.log(state.user.get('commonImg').toJS(), ownProps.id, state.user.get('commonImg').toJS()[ownProps.id]);
   ({
     avatar: state.user.getIn(['commonImg', ownProps.id]),
   });


const mapDispatchToProps = {
  uploadCommonImg: userActionCreators.uploadCommonImg,
};


export const Image = connect(mapStateToProps, mapDispatchToProps)(CmpImage);
export default Image;

