import { Layout, OffersGridList, Section } from '../components';
import React from 'react';

export default function Offers() {
  return (
    <Layout className="px-4">
      <Section
        title="Offers"
        subtitle="10"
        description="Easily manage and respond to offers from potential clients"
      />
      <OffersGridList />
    </Layout>
  );
}
