import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Input, Row, Typography } from "antd";

import torontoImage from "../../assets/toronto.jpg";
import dubaiImage from "../../assets/dubai.jpg";
import losAngelesImage from "../../assets/los-angeles.jpg";
import londonImage from "../../assets/london.jpg";

const { Title } = Typography;
const { Search } = Input;

interface Props {
  onSearch: (value: string) => void;
}

export const HomeHero = ({ onSearch }: Props) => {
  return (
      <div className="home-hero">
          <div className="home-hero__search">
              <Title className="home-hero__title">
                  Find a Laptop & Electronics
              </Title>
              <Search
                  placeholder="Search 'Macbook'"
                  size="large"
                  enterButton
                  className="home-hero__search-input"
                  onSearch={onSearch}
              />
          </div>
          <Row gutter={12} className="home-hero__cards">
              <Col xs={12} md={6}>
                  <Link to="/listings/toronto">
                      <Card cover={<img alt="Toronto" src={torontoImage} />}>
                          MacBook
                      </Card>
                  </Link>
              </Col>
              <Col xs={12} md={6}>
                  <Link to="/listings/dubai">
                      <Card cover={<img alt="Dubai" src={dubaiImage} />}>
                          HP
                      </Card>
                  </Link>
              </Col>
              <Col xs={0} md={6}>
                  <Link to="/listings/los%20angeles">
                      <Card
                          cover={
                              <img alt="Los Angeles" src={losAngelesImage} />
                          }
                      >
                          Dell
                      </Card>
                  </Link>
              </Col>
              <Col xs={0} md={6}>
                  <Link to="/listings/london">
                      <Card cover={<img alt="London" src={londonImage} />}>
                          ASUS
                      </Card>
                  </Link>
              </Col>
          </Row>
      </div>
  );
};
