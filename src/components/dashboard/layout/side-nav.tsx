'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { NavItemConfig } from '@/types/nav';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { navItems } from './config';
import { navIcons } from './nav-icons';

export function SideNav(): React.JSX.Element {
  const pathname = usePathname();

  const [isNavOpen, setIsNavOpen] = React.useState(true);

  const toggleNavVisibility = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Box
      sx={{
        '--SideNav-background': 'var(--mui-palette-neutral-950)',
        '--SideNav-color': 'var(--mui-palette-common-white)',
        '--NavItem-color': 'var(--mui-palette-neutral-300)',
        '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
        '--NavItem-active-background': 'var(--mui-palette-primary-main)',
        '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
        '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
        '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
        bgcolor: 'var(--SideNav-background)',
        color: 'var(--SideNav-color)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        left: 0,
        maxWidth: isNavOpen ? '100%' : '10%',
        position: 'fixed',
        scrollbarWidth: 'none',
        top: 0,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
      <Box
  sx={{
    alignItems: 'center',
    justifyContent: 'space-between', 
    backgroundColor: 'var(--mui-palette-neutral-950)',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    p: '4px 12px',
  }}
>
  <Box>
    <Stack spacing={2} sx={{ p: '12px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          src="/assets/lorem.png"
          sx={{ height: 'auto', width: '90px', marginLeft: isNavOpen ? '50px' : '5px' }}
        />
      </Box>
    </Stack>
  </Box>
  <Box
  sx={{
    position: 'absolute',
    top: '40%',
    right: 0, 
    zIndex: '9999', 
    cursor: 'pointer',
    padding: '10px',
  }}
  onClick={toggleNavVisibility}
>
  <img
    src={isNavOpen ? '/assets/hide_arrow.png' : '/assets/arrow.png'}
    alt="Toggle Navigation"
    style={{ height: 'auto', width: '20px' }}
  />
</Box>
</Box>
      </Stack>
      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
        {renderNavItems({ pathname, items: navItems, isNavOpen })}
      </Box>
 
      <Stack spacing={2} sx={{ p: '12px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            component="img"
            src="/assets/copyright.png"
            sx={{ height: 'auto', width: '90px' }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

function renderNavItems({ items = [], pathname, isNavOpen }: { items?: NavItemConfig[]; pathname: string; isNavOpen: boolean}): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { key, ...item } = curr;

    acc.push(<NavItem key={key} pathname={pathname} isNavOpen={isNavOpen} {...item} />);


    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  pathname: string;
  isNavOpen: boolean;
}

function NavItem({ disabled, external, href, icon, matcher, pathname, title, isNavOpen }: NavItemProps): React.JSX.Element {
  
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null; 


  return (
    <li>
      <Box
        {...(href
          ? {
              component: external ? 'a' : RouterLink,
              href,
              target: external ? '_blank' : undefined,
              rel: external ? 'noreferrer' : undefined,
            }
          : { role: 'button' })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--NavItem-color)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          position: 'relative',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            color: 'var(--NavItem-disabled-color)',
            cursor: 'not-allowed',
          }),
          ...(active && { 
            bgcolor: 'gray', 
            color: disabled ? 'var(--NavItem-disabled-color)' : '#FF630B', 
          }),
          '&:hover': {
            bgcolor: 'gray', 
            color: '#FF630B', 
          }
        }}
      >

<Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
  {Icon ? (
    <img
      src={Icon}
      alt="Icon"
      style={{
        height: 'auto',
        width: '15px',
      }}
    />
  ) : null}
</Box>

        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
           { isNavOpen ? title : "" }
          </Typography>
        </Box>
      </Box>
    </li>
  );
}
