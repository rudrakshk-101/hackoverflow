'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';

const data = [
  {
    Month: 'Jan 21',
    Humidity: 28.90,
    Moisture: 24.00
  },
  {
    Month: 'Feb 21',
    Humidity: 18.90,
    Moisture: 13.98
  },
  {
    Month: 'Jan 22',
    Humidity: 38.90,
    Moisture: 29.80
  }
];

export default function Example() {
  return (
    <Card className="mt-8 bg-transparent">
      <Title>Soil Moisture History</Title>
      <Text>Tracking Real-time Ssoil Moisture, Integrating It With ML, To Create A Powerful Smart Agricultural System.</Text>
      <AreaChart
        className="mt-4 h-80  text-white"
        data={data}
        categories={['Humidity', 'Moisture']}
        index="Month"
        colors={['indigo', 'fuchsia']}
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat('us').format(number).toString()} %`
        }
        yAxisWidth={60}
      />
    </Card>
  );
}
