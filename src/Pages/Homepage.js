import React from "react";
import { Button, Row, Col } from "reactstrap";
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
            <Col lg="2">
              <li style={{ listStyleType: "none" }}>
                <Row lg="2">
                  {user.id}: {user.username}
                </Row>
                <Row>
                  <img
                    src={user.profileImage}
                    alt="user profile"
                    className="rounded-circle Homepage_ProfileImage"
                  />
                </Row>
                {/* <Row> */}
                <a href={`/user/${user.id}`}>
                  <Button color="primary">See More</Button>
                </a>
                {/* </Row> */}
              </li>
            </Col>
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
