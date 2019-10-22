import React from "react";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
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
                <Row>
                  {user.id}: {user.username}
                </Row>
                <Row>
                  <img
                    src={user.profileImage}
                    alt="user profile"
                    className="rounded-circle Homepage_ProfileImage"
                  />
                </Row>
                <Row>
                  <Button
                    tag={Link}
                    to={`/user/${user.id}`}
                    color="primary"
                    className=""
                  >
                    See More
                  </Button>
                </Row>
              </li>
            </Col>
            <Col>
              <Row>
                <UserImages id={user.id}></UserImages>
              </Row>
            </Col>
          </div>
        ))}
      </ul>
    );
  }
}
export default Homepage;
