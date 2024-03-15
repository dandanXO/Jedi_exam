// components/Layout.js
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  const scrollRef = useRef(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  let scrollTimer = null; // 用於保存 setTimeout 的引用
  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      setShowHeader(false);
      if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(() => {
        // 這個函數會在滾動停止後 150 毫秒被調用
        setShowHeader(true); // 顯示菜單
      }, 150); // 150 毫秒後滾動停止認為滾動結束
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollElement = scrollRef.current;
      scrollElement.addEventListener('scroll', controlHeader);

      return () => {
        scrollElement.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);

  return (
    <div className='h-screen overflow-hidden flex flex-col'>
      <div className='bg-amber-500 w-full'>
        <header  style={{ display: showHeader ? 'block' : 'none', transition: 'all 0.3s' }}>
          Jedi Software
        </header>
        <nav >
          <button onClick={() => setShowMenu(!showMenu)}>Menu</button>
          {showMenu && (
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/find-the-cheese">Find the Cheese</Link></li>
            </ul>
          )}
        </nav>
        
      </div>
      <div className='overflow-auto' ref={scrollRef}>
      {children}
      </div>
    </div>
  );
};

export default Layout;
