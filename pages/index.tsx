import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import useLocalStorage from '../src/useLocalStorage';
import { classNames } from '../src/utils';
import { calculatePlates } from '../src/calculatePlates';

const KEY_AVAILABLE_PLATES = "available_plates";
const KEY_BARBELL_WEIGHT = "barbell_weight";

const Barbell35LB: number = 35;
const Barbell45LB: number = 45;

const Plate55LB: number = 55;
const Plate45LB: number = 45;
const Plate35LB: number = 35;
const Plate25LB: number = 25;
const Plate15LB: number = 15;
const Plate10LB: number = 10;
const Plate5LB: number = 5;


const barbellsList = [
  { name: '35 LB', value: Barbell35LB },
  { name: '45 LB', value: Barbell45LB }
];
const platesList = [
  { name: '55 LB', value: Plate55LB },
  { name: '45 LB', value: Plate45LB },
  { name: '35 LB', value: Plate35LB },
  { name: '25 LB', value: Plate25LB },
  { name: '15 LB', value: Plate15LB },
  { name: '10 LB', value: Plate10LB },
  { name: '5 LB', value: Plate5LB },
];

const Home: NextPage = (): JSX.Element => {

  const [availablePlates, setAvailablePlates] = useLocalStorage<number[]>(
    KEY_AVAILABLE_PLATES,
    [Plate45LB, Plate35LB, Plate25LB, Plate15LB, Plate10LB, Plate5LB]
  );

  const [barbellWeight, setBarbellWeight] = useLocalStorage<number>(
    KEY_BARBELL_WEIGHT,
    Barbell45LB
  );

  const [roundedWeight, setRoundedWeight] = useState<number>();

  const [platesConfig, setPlatesConfig] = useState<number[][]>([]);

  const [weight, setWeight] = useState<number>();

  useEffect(() => {
    if (weight) {
      let pConfig = calculatePlates(weight - barbellWeight, availablePlates);
      if (!pConfig) pConfig = [];

      let initialValue = 0;
      const rWeight = barbellWeight + pConfig.reduce((pValue: number, value: number[]) => pValue + value[0] * value[1], initialValue);

      setRoundedWeight(rWeight);
      setPlatesConfig(pConfig);
    }
  }, [barbellWeight, availablePlates, weight]);

  const weightInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredWeight: number = Number(event.target.value);
    setWeight(enteredWeight);
  };

  const barbellWeightInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedBarbelWeight = Number(event.target.value);
    setBarbellWeight(checkedBarbelWeight);
  };

  const platesCheckHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedList: number[] = [...availablePlates];
    let value: number = Number(event.target.value);
    
    if (event.target.checked) {
      updatedList = [...updatedList, value];
    } else {
      updatedList.splice(availablePlates.indexOf(value), 1);
    }

    setAvailablePlates(updatedList.sort((a, b) => { return  b - a; }));
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
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="sm:text-sm" id="price-currency">
                        LB
                      </span>
                    </div>
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
                      {platesConfig.length > 0
                        ?
                        <>
                          <h3 className="text-lg leading-6 font-medium text-gray-500">~{roundedWeight} LB</h3>
                          <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-6">
                            {platesConfig.map((plates, index) => (
                              <li key={index} className="col-span-1 flex shadow-sm rounded-md">
                                <div
                                  className={classNames(
                                    `barbell-${plates[0]}`,
                                    'flex-shrink-0 flex items-center justify-center w-12 text-white text-sm rounded-l-md font-bold'
                                  )}
                                >
                                  {plates[0]} LB
                                </div>
                                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                  <div className="flex-1 px-4 py-2 text-sm truncate">
                                    <p className="text-gray-500 font-bold">{`${plates[1]}x`}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </>
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
                    <div className="px-6 pb-6">
                      <div className="pt-6">
                        <label className="text-base font-medium text-gray-900">Barbell Weight</label>
                        <fieldset className="mt-4">
                          <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                            {barbellsList.map((barbell, index) => (
                              <div key={index} className="flex items-center">
                                <input
                                  id={`barbell-${barbell.value}`}
                                  name={`barbell-${barbell.value}`}
                                  type="radio"
                                  value={barbell.value}
                                  checked={barbellWeight === barbell.value}
                                  onChange={barbellWeightInputHandler}
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label htmlFor={`barbell-${barbell.value}`} className="ml-3 block text-sm font-medium text-gray-700">
                                  {barbell.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>

                      <div className="pt-6">
                        <label className="text-base font-medium text-gray-900">Available Plates</label>
                        <fieldset className="flex flex-wrap mt-4">
                          {platesList.map((plate, index) => (
                            <div key={index} className="relative flex items-start p-2">
                              <div className="flex items-center h-5">
                                <input
                                  id={`plate-${plate.value}`}
                                  name={`plate-${plate.value}`}
                                  value={plate.value}
                                  type="checkbox"
                                  defaultChecked={availablePlates.includes(plate.value)}
                                  onChange={platesCheckHandler}
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor={`plate-${plate.value}`} className="font-medium text-gray-700">
                                  {plate.name}
                                </label>
                              </div>
                            </div>
                          ))}
                        </fieldset>
                      </div>
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