import styled from 'styled-components';
import { animated } from 'react-spring';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: 0.3s;

    :hover {
      color: #666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;

    align-items: center;
    img {
      height: 120px;
      width: 120px;

      border-radius: 50%;

      margin-right: 32px;
    }

    div {
      strong {
        color: #3d3d4d;

        font-weight: bold;
        font-size: 36px;
        line-height: 42px;
      }
      p {
        font-size: 20px;
        line-height: 23px;

        color: #737380;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
    }
    li + li {
      margin-left: 80px;
    }
  }
`;

export const Issues = styled.div`
  margin-top: 34px;
`;

export const IssueLink = styled(animated.a)`
  display: flex;

  align-items: center;

  height: 112px;
  width: flex 1;
  padding: 16px;

  background-color: #fff;

  text-decoration: none;

  border-radius: 16px;
  margin-bottom: 16px;

  transition: 0.3s;

  :hover {
    margin-right: -20px;
    margin-left: 20px;
  }

  div {
    margin-left: 24px;

    flex: 1;

    strong {
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;

      color: #3d3d4d;
    }
    p {
      font-size: 18px;
      line-height: 21px;

      color: #a8a8b3;

      span + span {
        margin-left: 10px;
      }
    }
  }
`;
