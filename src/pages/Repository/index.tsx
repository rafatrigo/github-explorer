import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTransition } from 'react-spring';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

import { Header, RepositoryInfo, Issues, IssueLink } from './styles'; // eslint-disable-line

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  stargazers_count: number;
  description: string;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repositories: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [repository, setRepository] = useState<Repository | null>(null);

  useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then(response => {
      setIssues(response.data);
    });
  }, [params.repository]);

  const issuesWithTransition = useTransition(issues, issue => issue.id, {
    from: { zoom: 0, opacity: 0 },
    enter: { zoom: 1, opacity: 1 },
    leave: { zoom: 0, opacity: 0 },
  });

  return (
    <>
      <Header>
        <img alt="GitHub_explorer" src={logo} />
        <Link to="/">
          <FiChevronLeft size={20} />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issuesWithTransition.map(({ item, props, key }) => (
          <IssueLink
            style={props}
            key={key}
            href={item.html_url}
            target="_blanck"
          >
            <div>
              <strong>{item.title}</strong>
              <p>{item.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </IssueLink>
        ))}
      </Issues>
    </>
  );
};
export default Repositories;
