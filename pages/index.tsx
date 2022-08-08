import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import {
  calculatePlates
} from '../src/calculatePlates';

const availablePlates: number[][] =  [[45, 10], [35, 10], [25,10], [15, 10], [10, 10], [5, 10]];
const barbellWeight: number = 45;

const Home: NextPage = () => {

  const [platesConfig, setPlatesConfig] = useState<number[][]>([]);

  const [weight, setWeight] = useState<number>();

  useEffect(() => {
    if (weight) {
      let pConfig = calculatePlates(weight - barbellWeight, availablePlates);
      if (!pConfig) pConfig = [];

      setPlatesConfig(pConfig);
    }
  }, [weight]);
  
  const weightInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredWeight = Number(event.target.value);
    setWeight(enteredWeight);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline text-gray-400">
          Hello world! Weight is {weight}
        </h1>

        <input type="number" min={barbellWeight} step={10} onChange={weightInputHandler} />

        <ul>
          {platesConfig.map((plates, i) => {
            return(
              <li key={i}>{`${plates[1]} x ${plates[0]} LB`}</li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default Home;