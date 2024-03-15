'use client';
import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import Chart from './chart';
import { useEffect, useState } from 'react';



export default function FarmDashboard() {
  const [recommendedCrop,setRecommendedCrop] = useState('');
  const [crop,setCrop] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.43.242/moisture",{
          method: "GET"
        });
        const data = await response.json();
        setCrop((1023 - data.moistureData) / 1023.0 * 100);
        console.log(data.moistureData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
 }, []);

  
const waterLevels = [
  { name: '', value: 45 },
  { name: '', value: 79 },
  { name: '', value: crop }
 ];
 
 
 
 const airQualityIndex = [
  { name: '', value: 16.56 },
  { name: '', value: 18.99 },
  { name: '', value: 28.22 }
 ];

 const cropSuggestions = [
  { name: 'Carrot', value: 12.45 },
  { name: 'Pumpkins', value: 28.95 },
  { name: `${recommendedCrop}`, value: 38.75 }
 ];
 
 const data = [
  {
     category: 'Water Levels in Soil',
     stat: 'Average: 32.66',
     data: waterLevels
  },
  {
     category: 'Crop Suggestions',
     stat: 'Top 3 Crops',
     data: cropSuggestions
  },
  {
     category: 'Smart Monitoring',
     stat: 'Average: 21.25',
     data: airQualityIndex
  }
 ];


  const xyz = async() => {
    const response = await fetch('http://127.0.0.1:5000/crop-predict',{
      method: 'POST',
      body: JSON.stringify({"nitrogen": "16",
      "phosphorous": "21",
      "pottasium" : "9",
      "ph": "5",
      "rainfall": "6",
      "city":"delhi"}),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    setRecommendedCrop(data.prediction)
  }

  useEffect(() => {
    xyz();
  },[])

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl h-auto ">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total stats</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Level</Text>
              <Text className="text-right">%</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat('us').format(number).toString()
              }
              className="mt-2"
            />
          </Card>
        ))}
      </Grid>
      <Chart />
    </main>
 );
}
