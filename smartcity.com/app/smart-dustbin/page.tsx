"use client";
import { useState, useEffect } from "react";
import { FcEmptyTrash, FcFullTrash } from "react-icons/fc";

const arr = [10, 38, 41, 15, 29, 35, 46, 23, 7, 2];

export default function Page() {
 const [Status, setStatus] = useState<boolean>(true);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.43.242/dustbin",{
          method: "GET"
        });
        const data = await response.json();
        console.log(data);
        setStatus(data.sensorData === "Empty");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 1000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
 }, []);

 return (
    <div className="flex flex-col gap-2">
      <DustbinGroup init={0} Status={Status} />
      <DustbinGroup init={10} Status={Status} />
      <DustbinGroup init={20} Status={Status} />
      <DustbinGroup init={30} Status={Status} />
      <DustbinGroup init={40} Status={Status} />
    </div>
 );
}

function GreenDustbin({nm,key,Status} : {nm:number,key:number,Status:boolean})
{
  return (
    <div className="flex flex-col">
    {arr.includes(nm) && !Status ?  <FcFullTrash className="custom-icon-red text-6xl" /> : <FcEmptyTrash className="custom-icon-green text-6xl" />}
    <p className="text-center">D{nm}</p>
    </div>
  )
}

function DustbinGroup({init,Status}: {init:number,Status:boolean}): React.ReactElement {
  const arr: number[] = [];
  for (let i = 1; i <= 10; i++) {
     arr.push(init + i);
  }
  return (
     <div className="flex text-white justify-center items-center">
       {arr.map((item: number, index: number) => (
         <GreenDustbin key={index} nm={item} Status={Status}/>
       ))}
     </div>
  );
 }