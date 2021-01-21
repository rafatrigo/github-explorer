import styled from 'styled-components';
import { shade } from 'polished';
import { animated } from 'react-spring';

export const Title = styled.h1`
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  max-width: 433px;
  margin-top: 45px;

  color: #3a3a3a;

  @media (max-width: 490px) {
    font-size: 36px;
    line-height: 44px;
  }

  @media (max-width: 380px) {
    font-size: 26px;
    line-height: 34px;
  }
`;

export const Error = styled.span`
  display: block;
  margin: 10px;
  color: #c53030;
`;

export const Form = styled.form`
  display: flex;

  max-width: 714px;

  margin-top: 40px;

  input {
    display: flex;
    max-width: 250px;
    height: 50px;

    width: 100%;

    border-radius: 30px 0 0 30px;
    border: none;

    padding: 14px;
    margin-top: 14px;

    color: #3a3a3a;

    ::placeholder {
      color: #a8a8b3;
    }
  }

  input + input {
    margin: 14px 14px auto;
    border-radius: 0;
  }

  button {
    min-width: 120px;
    max-width: 210px;
    width: 100%;
    height: 50px;

    border: none;
    border-radius: 0 30px 30px 0;

    color: #fff;
    background-color: #04d361;

    align-self: flex-end;

    transition: 0.3s;

    :hover {
      background-color: ${shade(0.3, '#04d361')};
      font-size: 18px;
    }
  }

  @media (max-width: 620px) {
    flex-direction: column;
    margin: 40px 20px 0 20px;

    input:first-child {
      border-radius: 20px 20px 0 0;
    }

    input {
      max-width: 100%;

      & + input {
        margin: 14px 0 14px 0;
      }
    }

    button {
      max-width: 100%;
      border-radius: 0 0 20px 20px;
    }
  }
`;

export const Repositories = styled.div`
  margin-top: 34px;
  max-width: 714px;
`;

export const Link = styled(animated.a)`
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

  img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
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

  svg {
    margin-left: auto;
  }

  @media (max-width: 620px) {
    padding: 14px;
    img {
      height: 60px;
      width: 60px;
    }
  }

  @media (max-width: 595px) {
    div {
      height: 100%;
      strong {
        font-size: 22px;
        line-height: 26px;
      }

      p {
        display: flex;
        flex-direction: column;
        span + span {
          margin: 0;
        }

        span:last-child {
          padding-bottom: 5px;
        }
      }
    }
  }

  @media (max-width: 500px) {
    overflow: hidden;
  }
`;
