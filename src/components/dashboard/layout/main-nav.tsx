'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import TextField from '@mui/material/TextField';
import { usePopover } from '@/hooks/use-popover';
import { MobileNav } from './mobile-nav';
import { UserPopover } from './user-popover';


import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const { checkSession } = useUser();

  const router = useRouter();

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        logger.error('Sign out error', error);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router and we need to do it manually
      router.refresh();
      // After refresh, AuthGuard will handle the redirect
    } catch (err) {
      logger.error('Sign out error', err);
    }
  }, [checkSession, router]);


  const userPopover = usePopover<HTMLDivElement>();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
             <Tooltip title="Search">
              <TextField
              placeholder="Search"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <IconButton size="small" edge="end">
                     <MagnifyingGlassIcon />
                  </IconButton>
                ),
              }}
              sx={{ width: 900 }}
              />
      </Tooltip>
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Tooltip title="Settings">
              <Box
              component="img"
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              src="/assets/avatar-jane.png"
              sx={{ cursor: 'pointer', height: 'auto', width: '100px' }}
              />
            </Tooltip>

            <Tooltip title="Notifications">
              <Box
              component="img"
              src="/assets/notification.png"
              sx={{ cursor: 'pointer', height: 'auto', width: '40px' }}
              />
            </Tooltip>
            <Tooltip title="Settings">
              <Link href={paths.dashboard.settings}>
                <Box
                component="a"
                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', }}
                >
                  <img
                  src="/assets/settings-menu.png"
                  alt="Settings"
                  style={{ height: 'auto', width: '40px' }}
                  />
                  </Box>
                  </Link>
                  </Tooltip>
                  <Tooltip title="Logout" >
                    <Box 
                    component="img"
                    onClick={handleSignOut}
                    src="/assets/logout.png"
                    sx={{ cursor: 'pointer', height: 'auto', width: '40px' }}
                    />
                    </Tooltip>
                    </Stack>
                    </Stack>
                    </Box>
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
