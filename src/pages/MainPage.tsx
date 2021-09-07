import React, { ReactElement } from 'react';
import SearchInput from '../components/search-input/SearchInput';
import { FiSearch } from 'react-icons/fi';

export default function MainPage(): ReactElement {
  return (
    <div className={'mainPageWrapper'}>
      <section className={'graphWrapper'}>
        <div>graphWrapper</div>
      </section>
      <aside className={'sideBar'}>
        {/* input  */}
        <div className={'searchInputWrapper'}>
          <SearchInput />
        </div>

        <div className={'emptyResultWrapper py-40 mt-20'}>
          <div className={'flex justify-content-center'}>
            <FiSearch size={'40px'} />
          </div>
          <div className={'flex justify-content-center textWrapper mx-auto text-center'}>
            <p>Search for a GitHub repository to populate graph</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
