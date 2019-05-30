import React from "react";
import './UserCard.css';

const UserCard=(props)=>{
    return (
      <React.Fragment>
        <div className="card" style={{width: '120vh'}}>
          <img className="card-img-top" src={props.userDetails.visible ? props.userDetails.imageUrl: ""} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{props.userDetails.name}</h5>
            <div className="card-text">
              <button className='btn-lg btn-primary' onClick={()=>props.Liked(props.userDetails.email)}>Like</button>
              <button className='btn-lg btn-success' onClick={()=>props.SuperLiked(props.userDetails.email)}>SuperLike</button>
              <button className='btn-lg btn-danger' onClick={()=>props.Blocked(props.userDetails.email)}>Block</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

export default UserCard;
