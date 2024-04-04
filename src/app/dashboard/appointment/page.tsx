import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import { config } from '@/config';
import Grid from '@mui/material/Unstable_Grid2';
import Appointment from "@/components/dashboard/appointment/appointment"
export const metadata = { title: `Appointment | Dashboard | ${config.site.name}` } satisfies Metadata;
export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Grid>
          <Appointment/>
        </Grid>
      </Stack>
    </Stack>
  );
}

