import React from "react";
import { Button } from "reactstrap";
import UserImages from "../Containers/UserImages";

class Homepage extends React.Component {
  render() {
    return (
      <ul>
        {this.props.users.map(user => (
          <div
            key={user.id}
            className="row border-0 mb-5 rounded pt-3 pb-3 Homepage_UserBox"
          >
            <li style={{ listStyleType: "none" }} className="col-2">
              <div className="row">
                {user.id}: {user.username}
              </div>
              <img
                src={user.profileImage}
                alt="user profile"
                className="row rounded-circle Homepage_ProfileImage"
              ></img>
              <a href={`/user/${user.id}`}>
                <Button color="primary" className="row">
                  See More
                </Button>
              </a>
            </li>
            <div className="col">
              <UserImages id={user.id}></UserImages>
            </div>
          </div>
        ))}
      </ul>
    );
  }
}
export default Homepage;
