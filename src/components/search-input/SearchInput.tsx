import React, { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './SearchInput.scss';
import debounce from 'lodash/debounce';
import { appConfig } from '../../config';
import useOuterClick from '../../utils/useOuterClick';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { addInitialDataToList, searchGithubStatsHook } from '../../store/get-stats';

type searchResult = {
  full_name: string;
  id: number;
};

export default function SearchInput(): ReactElement {
  const dispatch: Dispatch = useDispatch();
  const { githubToken } = appConfig;
  const [searchResults, setSearchResults] = useState<searchResult[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hideAutoComplete, setHideAutoComplete] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

  const innerRef = useOuterClick((ev: any) => {
    /*event handler code on outer click*/
    if (ev.target.localName != 'input') {
      setHideAutoComplete(true);
    }
  });

  const delayedHandleChange = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    const { value: query } = e.target;
    setQuery(query);
    if (!query || query.length < 3) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    setSearchResults([]);
    const results = await fetch(`https://api.github.com/search/repositories?q=${query}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${githubToken}`,
      },
    });
    const data = await results.json();
    setIsLoading(false);
    setSearchResults(data.items);
  }, 400);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    delayedHandleChange(e);
  };

  useEffect(() => {
    setHideAutoComplete(false);
  }, [query]);

  const handleSelection = (data: searchResult) => {
    dispatch(
      searchGithubStatsHook({
        fullName: data.full_name,
        initialData: data,
        isLoading: true,
        error: '',
        stats: [],
        color: generateRandomColor(),
        hovered: false,
      })
    );
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }

    setQuery('');
  };

  return (
    <>
      <div className={'searchInputInnerWrapper'}>
        <input
          onClick={() => {
            setHideAutoComplete(false);
          }}
          ref={inputRef}
          onChange={onInputChange}
          type='text'
          placeholder={'Search a Github Repository...'}
        />
        <div className={'iconWrapper px-12'}>
          <FiSearch size={'18px'} />
        </div>
        <div className={'autocompleteWrapper'}>
          {isLoading && <div className={'flex justify-content-center py-20'}>loading...</div>}
          {!isLoading && query && searchResults?.length > 0 && !hideAutoComplete && (
            <>
              <div className={'buttonWrapper'}>
                {searchResults.map((s, i) => {
                  const { full_name, id } = s;
                  const orgName = full_name.split('/')[0];
                  const repoName = full_name.split('/')[1];
                  const parts = repoName.split(new RegExp(`(${query})`, 'gi'));
                  return (
                    <button
                      key={`${id}-${i}`}
                      className={'flex align-items-center'}
                      ref={innerRef}
                      onClick={() => {
                        handleSelection(s);
                      }}
                      onKeyDown={() => {
                        handleSelection(s);
                      }}
                    >
                      <p className={'text-gray'}>{orgName}</p>
                      <span className={'mx-2 text-gray'}>/</span>
                      <span className={'specialTruncate'}>
                        {parts.map((part, i) =>
                          part.toLowerCase() === query.toLowerCase() ? <b key={i}>{part}</b> : part
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function generateRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
