import React, {useState} from "react";
import { Card, Row, Col, Avatar, Typography, Select } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoAPI";

const { Title, Text } = Typography;
const { Option } = Select;
const demoImage =
  "https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbDJBN0ZaY2hGdTVZQWVsX0FZLW5EZXVwNGcwZ3xBQ3Jtc0tuVm15dy01aGJQbnZCWVQ4cTVVSTFZVEtiRE5sNUx2UllSOXFCWVpOOFBUQkQ3dEh2aGNMdEVDdVdJdEJleUszenFxdERMVlZBaFRockhDZE9PSHphMlRTU29ZWm0wZmFwMlp0aGFPczMyMXVQbHNKbw&q=https%3A%2F%2Fwww.bing.com%2Fth%3Fid%3DOVFT.mpzuVZnv8dwIMRfQGPbOPC%26pid%3DNews&v=9DDX3US3kss";

const News = ({ simplified }) => {
  const [newsCategory, setnewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 54,
  });
  const { data } = useGetCryptosQuery(100);

  console.log(cryptoNews);

  if (!cryptoNews?.value) return "Loading...";
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a news Category"
            optionFilterProp="children"
            onChange={(value) => setnewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) > 0
            }
          >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card className="news-card" hoverable>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-content">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="news"
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
