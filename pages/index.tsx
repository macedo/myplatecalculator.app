import type {  NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image'; 
import Link from 'next/link';

import useLocalStorage from '../src/useLocalStorage';
import {
  calculatePlates
} from '../src/calculatePlates';

const availablePlates: number[][] =  [[45, 10], [35, 10], [25,10], [15, 10], [10, 10], [5, 10]];

const Barbell45: number = 45;
const Barbell35: number = 35;

const Home: NextPage = (): JSX.Element => {

  const [barbellWeight, setBarbellWeight] = useLocalStorage('barbell_weight', Barbell45);

  const [platesConfig, setPlatesConfig] = useState<number[][]>([]);

  const [weight, setWeight] = useState<number>();

  useEffect(() => {
    if (weight) {
      let pConfig = calculatePlates(weight - barbellWeight, availablePlates);
      if (!pConfig) pConfig = [];

      setPlatesConfig(pConfig);
    }
  }, [barbellWeight, weight]);
  
  const weightInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredWeight: number = Number(event.target.value);
    setWeight(enteredWeight);
  };

  const barbellWeightInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedBarbelWeight = Number(event.target.value);
    setBarbellWeight(checkedBarbelWeight);
  };

  const barbellWeights = [
    { id: 'barbell35', value: Barbell35, title: '35LB' },
    { id: 'barbell45', value: Barbell45, title: '45LB' },
  ];

  const hasPlateConfig = (): boolean => {
    return platesConfig.length > 0;
  };

  
  const classNames = (...classes: string[]): string => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <>
      <Head>
        <title>Plate Calculator</title>
      </Head>

      <div className="min-h-full">
        <header className="pb-24 bg-indigo-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative py-5 flex items-center justify-center lg:justify-between">
              {/* Logo */}
              <div className="absolute left-0 flex-shrink-0 lg:static">
                <Link href="/">
                  <a>
                    <Image className="h-8 w-auto" width={32} height={32} src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg" alt="Workflow" />
                  </a>
                </Link>
              </div>

              {/* Search */}
              <div className="flex-1 min-w-0 pl-12 lg:hidden">
                <div className="max-w-xs w-full mx-auto">
                  <div className="relative text-white focus-within:text-gray-600">
                    <input type="number"
                      onChange={weightInputHandler}
                      className="block appearance-none w-full bg-white bg-opacity-20 py-2 pr-3 border border-transparent rounded-md leading-5 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Weight"
                      name="weight"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block border-t border-white border-opacity-20 py-5">
              <div className="grid grid-cols-3 gap-8 items-center">
                <div className="max-w-md w-full mx-auto">
                  <div className="relative text-white focus-within:text-gray-600">
                    <label htmlFor="weight" className="block text-sm font-medium text-white">Weight</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input type="number"
                        onChange={weightInputHandler}
                        className="bg-white bg-opacity-20 py-2 pr-3 border border-transparent rounded-md leading-5 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 block w-full sm:text-sm"
                        name="weight"
                        id="weight"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="sm:text-sm" id="price-currency">
                          LB
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow min-h-full">
                    <div className="p-6">
                      { hasPlateConfig()
                        ?
                          <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-6">
                            {platesConfig.map((plates, i) => (
                              <li key={plates[0]} className="col-span-1 flex shadow-sm rounded-md">
                                <div
                                  className={classNames(
                                    `barbell-${plates[0]}`,
                                    'flex-shrink-0 flex items-center justify-center w-12 text-white text-sm rounded-l-md font-bold'
                                  )}
                                >
                                  {`${plates[0]} LB`}
                                </div>
                                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                  <div className="flex-1 px-4 py-2 text-sm truncate">
                                    <p className="text-gray-500 font-bold">{`${plates[1]}x`}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                        :
                          <>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No weight</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by selection a weight.</p>
                          </>
                      }
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="bg-grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                      <label className="text-base font-medium text-gray-900">Barbell Weight</label>
                      <fieldset className="mt-4">
                        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                          {barbellWeights.map((bWeight) => (
                            <div key={bWeight.id} className="flex items-center">
                              <input id={bWeight.id}
                                name="barbell-weight"
                                type="radio"
                                value={bWeight.value}
                                defaultChecked={bWeight.value == barbellWeight }
                                onChange={barbellWeightInputHandler}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label htmlFor={bWeight.id} className="ml-3 block text-sm font-medium text-gray-700">
                                {bWeight.title}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
              <span className="block sm:inline">&copy; Rafael Macedo.</span>{' '}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;