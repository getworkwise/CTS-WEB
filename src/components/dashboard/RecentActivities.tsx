import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockActivities = [
  {
    id: '1',
    action: 'Lost Item Reported',
    created: '2024-08-14T10:30:00Z',
  },
  {
    id: '2',
    action: 'Found Item Recorded',
    created: '2024-08-14T09:15:00Z',
  },
  {
    id: '3',
    action: 'Match Confirmed',
    created: '2024-08-13T16:45:00Z',
  },
  {
    id: '4',
    action: 'User Registered',
    created: '2024-08-13T14:20:00Z',
  },
  {
    id: '5',
    action: 'Item Returned to Owner',
    created: '2024-08-13T11:05:00Z',
  }
];

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {mockActivities.map((activity) => (
            <li key={activity.id} className="flex justify-between items-center text-sm">
              <span>{activity.action}</span>
              <span className="text-xs text-gray-400">
                {new Date(activity.created).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}