import React, { useState, useCallback, FormEvent, useEffect } from 'react'; // eslint-disable-line
import { FiChevronRight } from 'react-icons/fi';

import { useTransition } from 'react-spring';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

import { Title, Form, Repositories, Error, Link } from './styles'; // eslint-disable-line

interface Content {
  id: number;
  login?: string;
  avatar_url?: string;
  followers?: number;
  following?: number;
  public_repos?: number;
  full_name?: string;
  description?: string;
  owner?: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newUser, setNewUser] = useState('');
  const [newRepository, setNewRepository] = useState('');
  const [content, setContent] = useState<Content[]>(() => {
    const storagedContent = localStorage.getItem('@GithubExplorer:content');

    if (storagedContent) {
      return JSON.parse(storagedContent);
    }
    return [];
  });

  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:content', JSON.stringify(content));
  }, [content]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        if (newUser) {
          if (newRepository) {
            const response = await api.get<Content>(
              `/repos/${newUser}/${newRepository}`,
            );
            const alredyexist = content.find(
              item => item.id === response.data.id,
            );
            if (!alredyexist) {
              setContent(state => [response.data, ...state]);
            }
            setInputError('');
          } else {
            const response = await api.get<Content>(`/users/${newUser}`);
            const alredyexist = content.find(
              item => item.id === response.data.id,
            );
            if (!alredyexist) {
              setContent(state => [response.data, ...state]);
            }
            setInputError('');
          }
        } else {
          setInputError('Nome de usuário obrigatório');
        }
      } catch (error) {
        setInputError('Nenhum usuário ou repositório encontrado');
      }

      setNewRepository('');
      setNewUser('');
    },
    [newRepository, newUser, content],
  );

  const contentWithTransition = useTransition(content, item => item.id, {
    from: { zoom: 0, opacity: 0 },
    enter: { zoom: 1, opacity: 1 },
    leave: { zoom: 0, opacity: 0 },
  });
  return (
    <>
      <img alt="GitHub_explorer" src={logo} />
      <Title>Explore repositórios no GitHub</Title>
      <Form onSubmit={handleSubmit}>
        <input
          value={newUser}
          onChange={event => setNewUser(event.target.value)}
          placeholder="Usuário"
        />
        <input
          value={newRepository}
          onChange={event => setNewRepository(event.target.value)}
          placeholder="Repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {contentWithTransition.map(({ item, props, key }) => {
          if (item.full_name) {
            return (
              <Link
                style={props}
                key={key}
                href={`/repositories/${item.full_name}`}
              >
                <img src={item.owner?.avatar_url} alt={item.owner?.login} />
                <div>
                  <strong>{item.full_name}</strong>
                  <p>{item.description}</p>
                </div>
                <FiChevronRight size={20} />
              </Link>
            );
          }
          return (
            <Link style={props} key={key} href={`/users/${item.login}`}>
              <img src={item.avatar_url} alt={item.login} />
              <div>
                <strong>{item.login}</strong>
                <p>
                  <span>
                    Following:
                    {item.following}
                  </span>
                  <span>
                    Followers:
                    {item.followers}
                  </span>
                  <span>
                    Repositórios públicos:
                    {item.public_repos}
                  </span>
                </p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          );
        })}
      </Repositories>
    </>
  );
};

export default Dashboard;
