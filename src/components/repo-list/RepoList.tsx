import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store/store-types';
import { FiSearch } from 'react-icons/fi';
import './RepoList.scss';
import { FiStar, FiTrash2 } from 'react-icons/fi';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import { Dispatch } from 'redux';
import { deleteStat, setHover, setHoverOut, setParentHover, setParentHoverOut } from '../../store/get-stats';

export default function RepoList(): ReactElement {
  const { list = [], hoverOnList } = useSelector((state: IState) => state.statsList);
  const dispatch: Dispatch = useDispatch();

  const handleMouseIn = (name: string) => {
    dispatch(setHover(name));
  };
  const handleMouseOut = (name: string) => {
    dispatch(setHoverOut(name));
  };
  const handleParentMouseIn = () => {
    dispatch(setParentHover());
  };
  const handleParentMouseOut = () => {
    dispatch(setParentHoverOut());
  };
  const handleDelete = (name: string) => {
    dispatch(deleteStat(name));
  };
  return (
    <>
      <div
        className={'repoListWrapper'}
        role='presentation'
        onMouseEnter={() => {
          handleParentMouseIn();
        }}
        onMouseLeave={() => {
          handleParentMouseOut();
        }}
      >
        {Object.values(list).length > 0 && (
          <>
            {Object.values(list).map((data) => {
              const { initialData, color, isLoading, hoverState } = data;
              const { full_name: fullName, stargazers_count: starCount = 0, updated_at } = initialData;
              const orgName = fullName.split('/')[0];
              const repoName = fullName.split('/')[1];
              const updatedAtString: string = formatDistanceStrict(new Date(updated_at), new Date(), {
                addSuffix: true,
              });
              return (
                <button
                  className={`coloredBg my-15 cursor-pointer ${hoverOnList && hoverState ? 'hovered' : ''} ${
                    hoverOnList && !hoverState ? 'dimmed' : ''
                  }`}
                  onMouseEnter={() => {
                    handleMouseIn(fullName);
                  }}
                  onMouseLeave={() => {
                    handleMouseOut(fullName);
                  }}
                  key={fullName}
                  style={{ background: color }}
                >
                  <div className={'repoWrapper w-100'}>
                    <div
                      className={`flex w-100 repoButton justify-content-space-between align-items-center cursor-pointer`}
                    >
                      <div className={'flex flex-column'}>
                        <div className={'flex'}>
                          <p className={' m-0'}>{orgName}</p>
                          <span className={'mx-2'}>/</span>
                          <b className={'specialTruncate text-white'}>{repoName}</b>
                        </div>
                        <div className={'flex mt-6'}>
                          <div className={'mr-2'}>
                            <FiStar />
                          </div>
                          <div className={'text-white'}>
                            <b>{kFormatter(starCount)}</b>
                          </div>
                          <div className={'mx-5'}>Updated {updatedAtString}</div>
                        </div>
                      </div>
                      <div className={'flex justify-items-center align-items-center'}>
                        <div
                          onClick={() => {
                            handleDelete(fullName);
                          }}
                          role={'presentation'}
                          className={'noButtonStyles cursor-pointer'}
                        >
                          <FiTrash2 size={'18px'} />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </>
        )}
        {Object.values(list).length === 0 && (
          <div className={'emptyResultWrapper py-40 mt-20'}>
            <div className={'flex justify-content-center'}>
              <FiSearch size={'40px'} />
            </div>
            <div className={'flex justify-content-center textWrapper mx-auto text-center'}>
              <p>Search for a GitHub repository to populate graph</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function kFormatter(num: number): string {
  let formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(num);
}
