import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import { config } from '@/config';
import { Calendar } from '@/components/dashboard/overview/calendar';
import { Top } from '@/components/dashboard/overview/top';
import Sidebar from '@/components/dashboard/overview/sidebar';
export const metadata = { title: `Home | Dashboard | ${config.site.name}` } satisfies Metadata;
const sidebarData = [
  {
    "veterinary_name": "Chrissie Lee",
    "email": "chrissielee@gmail.com",
    "address": "1st Avenue, Golden Street, Springville Village, San Diego, California",
    "type": "Client",
    "building": "Green Bow Vett",
    "contact_number": "+01 234 567 8910",
    "image": "/assets/Chrissie.png"
  },
  {
    "veterinary_name": "Danica Jane",
    "address": "4517 Washington Avenue, Manchester, Kentucky 39495",
    "type": "Manager",
    "email": " danicajane@gmail.com",
    "building": "Green Bow Vett",
    "contact_number": "+01 234 567 8910",
    "image": "/assets/danica.png"
  },
  {
    "veterinary_name": "John Fins",
    "email": "johnfins8123@gmail.com",
    "address": "4517 Washington Avenue, Manchester, Kentucky 39495",
    "type": "Client",
    "building": "Green Bow Vett",
    "contact_number": "+01 234 567 8910",
    "image": "/assets/John.png"
  },
  {
    "veterinary_name": "John Newton",
    "email": "johnnewton@gmail.com",
    "address": "4517 Washington Avenue, Manchester, Kentucky 39495",
    "type": "Client",
    "building": "Green Bow Vett",
    "contact_number": "+01 234 567 8910",
    "image": "/assets/men.jpg"
  },
  {
    "veterinary_name": "Leonardo Caprio",
    "email": "leonardo@gmail.com",
    "address": "4517 Washington Avenue, Manchester, Kentucky 39495",
    "type": "Client",
    "building": "Green Bow Vett",
    "contact_number": "+01 234 567 8910",
    "image": "/assets/leonardo.png"
  },
];
export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={2}>
      <Grid item lg={8} md={12} xs={12} sx={{ height: '100%' }}>
        <Top />
        <Calendar />
      </Grid>
      <Grid item lg={4} md={12} xs={12}>
        <Sidebar data={sidebarData}/>
      </Grid>
    </Grid>
  );
}
