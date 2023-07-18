import {
  Layout,
  Proceed,
  GridList,
  RecentTransactions,
  WelcomePage
} from '../components';
import tutorStore from '../state/tutorStore';
import { useEffect } from 'react';

export default function Dashboard() {
  const { fetchTutorActivityFeed, tutorActivityFeed } = tutorStore();

  useEffect(() => {
    fetchTutorActivityFeed();
  }, []);

  return (
    <Layout className="p-2 bg-white">
      <WelcomePage
        greeting="Hi Leslie, Good Evening"
        date="Tuesday, July 21"
        time="13:00"
      />
      <Proceed />
      <GridList />
      <RecentTransactions />
    </Layout>
  );
}
