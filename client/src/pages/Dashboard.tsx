import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.username || 'Maintenance Team Member'}!
      </h1>

      {loading ? (
        <div>Loading dashboard...</div>
      ) : (
        <>
          {/* KPI cards layout */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border rounded p-4 shadow">MTBF: -- hrs</div>
            <div className="border rounded p-4 shadow">MTTR: -- hrs</div>
            <div className="border rounded p-4 shadow">Uptime %: --%</div>
            <div className="border rounded p-4 shadow">Open Work Orders: --</div>
          </div>

          {/* Equipment Status Placeholder */}
          <h2 className="text-xl font-semibold mb-2">Equipment Status</h2>
          <div className="border rounded p-4 shadow">
            Coming soon: real-time equipment status table.
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;

