import React, { ReactElement } from 'react';
import SearchInput from '../../components/search-input/SearchInput';
import './MainPage.scss';
import RepoList from '../../components/repo-list/RepoList';
import Chart from '../../components/chart/Chart';

export default function MainPage(): ReactElement {
  return (
    <div className={'mainPageWrapper'}>
      <section className={'graphWrapper'}>
        <div className={'flex w-100 align-items-center h-100'}>
          <Chart />
        </div>
      </section>
      <aside className={'sideBar'}>
        <div className={'p-20'}>
          {/* input  */}
          <div className={'searchInputWrapper'}>
            <SearchInput />
          </div>

          <RepoList />
        </div>
      </aside>
    </div>
  );
}
