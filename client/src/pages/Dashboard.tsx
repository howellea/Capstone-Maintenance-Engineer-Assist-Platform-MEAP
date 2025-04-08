import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_LIVE_READINGS } from '../utils/queries';

const Dashboard = () => {
  const { loading: loadingUser, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me;

  const { loading: loadingReadings, data: readingsData } = useQuery(QUERY_LIVE_READINGS, {
    variables: { equipmentId: 'Pump-101' },
  });

  const readings = readingsData?.liveReadings || [];

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.username || 'Maintenance Team Member'}!
      </h1>

      {(loadingUser || loadingReadings) ? (
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

          {/* Equipment Status Table */}
          <h2 className="text-xl font-semibold mb-2">Equipment Status: Pump-101</h2>
          <div className="border rounded p-4 shadow overflow-x-auto">
            <table className="table-auto w-full text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1">Timestamp</th>
                  <th className="px-2 py-1">Temp (°C)</th>
                  <th className="px-2 py-1">Flow Rate</th>
                  <th className="px-2 py-1">Vibration</th>
                  <th className="px-2 py-1">Motor Status</th>
                </tr>
              </thead>
              <tbody>
                {readings.map((r: any) => (
                  <tr key={r._id}>
                    <td className="px-2 py-1">{new Date(Number(r.timestamp)).toLocaleString()}</td>
                    <td className="px-2 py-1">{r.temperature ?? '--'}</td>
                    <td className="px-2 py-1">{r.flowRate ?? '--'}</td>
                    <td className="px-2 py-1">{r.vibration ?? '--'}</td>
                    <td className="px-2 py-1">{r.motorStatus ? 'Running' : 'Stopped'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;
