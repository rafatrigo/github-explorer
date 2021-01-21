import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import { Header, UserInfo, Repositories } from './styles';

interface UserParams {
  user: string;
}

interface IUser {
  login: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  targazers_count: number;
}

const User: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);

  const { params } = useRouteMatch<UserParams>();

  useEffect(() => {
    api.get(`users/${params.user}`).then(response => {
      setUser(response.data);
    });
    api.get(`users/${params.user}/repos`).then(response => {
      setRepos(response.data);
    });
  }, [params.user]);

  return (
    <>
      <Header>
        <img alt="GitHub_explorer" src={logo} />
        <Link to="/">
          <FiChevronLeft size={20} />
          Voltar
        </Link>
      </Header>
      {user && (
        <>
          <UserInfo>
            <header>
              <img src={user.avatar_url} alt={user.login} />
              <div>
                <strong>{user.login}</strong>
                <p>{user.location}</p>
              </div>
            </header>
            <ul>
              <li>
                <strong>{user.followers}</strong>
                <span>Followers</span>
              </li>
              <li>
                <strong>{user.following}</strong>
                <span>Following</span>
              </li>
              <li>
                <strong>{user.public_repos}</strong>
                <span>Repositórios públicos</span>
              </li>
            </ul>
          </UserInfo>
          <Repositories>
            {repos.map(repo => (
              <a key={repo.id} href={repo.html_url}>
                <div>
                  <strong>{repo.name}</strong>
                  <p>{repo.description}</p>
                </div>
                <FiChevronRight size={20} />
              </a>
            ))}
          </Repositories>
        </>
      )}
    </>
  );
};

export default User;
