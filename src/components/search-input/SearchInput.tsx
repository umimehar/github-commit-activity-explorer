import React, { ReactElement } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchInput(): ReactElement {
  return (
    <>
      <div className={'searchInputInnerWrapper'}>
        <input type='text' placeholder={'Search a Github Repository...'} />
        <div className={'iconWrapper px-12'}>
          <FiSearch size={'18px'} />
        </div>
      </div>
    </>
  );
}
