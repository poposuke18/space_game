// src/components/game/layout/NavSidebar.tsx

'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Users, Building2, FlaskConical, Shield } from 'lucide-react';

type NavItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
};

export const NavSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { icon: <Home size={24} />, label: 'ダッシュボード', path: '/dashboard' },
    { icon: <Users size={24} />, label: '市民管理', path: '/citizens' },
    { icon: <Building2 size={24} />, label: '施設管理', path: '/facilities' },
    { icon: <FlaskConical size={24} />, label: '研究開発', path: '/research' },
    { icon: <Shield size={24} />, label: '軍事', path: '/military' },
  ];

  return (
    <nav className="w-16 bg-gray-800 p-3 flex flex-col items-center space-y-6">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => router.push(item.path)}
          className={`p-2 transition-colors relative group
            ${pathname === item.path 
              ? 'text-white bg-gray-700 rounded' 
              : 'text-gray-400 hover:text-white'
            }`}
          aria-label={item.label}
        >
          {item.icon}
          {/* ツールチップ */}
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-sm rounded 
                         opacity-0 group-hover:opacity-100 whitespace-nowrap">
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};