import React, { useEffect, useRef } from 'react';

export default function useOuterClick(callback: any) {
  const callbackRef = useRef<any>(); // initialize mutable ref, which stores callback
  const innerRef = useRef<any>(); // returned to client, who marks "border" element

  // update cb on each render, so second useEffect has access to current value
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
    function handleClick(e: any) {
      if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target)) callbackRef.current(e);
    }
  }, []); // no dependencies -> stable click listener

  return innerRef; // convenience for client (doesn't need to init ref himself)
}
