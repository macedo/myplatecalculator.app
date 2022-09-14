import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import useLocalStorageState from 'use-local-storage-state';
import { classNames } from '../src/utils/helpers/styles.helpers';
import calculatePlates from '../src/calculatePlates';

import { Barbell35LB, Barbell45LB } from '../src/utils/constants/barbells';
import {
  Plate10LB, Plate15LB, Plate25LB, Plate2_5LB, Plate35LB, Plate45LB, Plate55LB, Plate5LB,
} from '../src/utils/constants/plates';
import { KEY_AVAILABLE_PLATES, KEY_BARBELL_WEIGHT, KEY_ON_EACH_SIDE_ENABLED } from '../src/utils/constants/localStorage';

const barbellsList = [
  { id: 1, name: '35 LB', value: Barbell35LB },
  { id: 2, name: '45 LB', value: Barbell45LB },
];

const platesList = [
  { id: 1, name: '55 LB', value: Plate55LB },
  { id: 2, name: '45 LB', value: Plate45LB },
  { id: 3, name: '35 LB', value: Plate35LB },
  { id: 4, name: '25 LB', value: Plate25LB },
  { id: 5, name: '15 LB', value: Plate15LB },
  { id: 6, name: '10 LB', value: Plate10LB },
  { id: 7, name: '5 LB', value: Plate5LB },
  { id: 8, name: '2.5 LB', value: Plate2_5LB },
];

function Home() {
  const [onEachSideEnabled, setOnEachSideEnable] = useLocalStorageState<boolean>(
    KEY_ON_EACH_SIDE_ENABLED,
    {
      defaultValue: false,
    },
  );

  const [availablePlates, setAvailablePlates] = useLocalStorageState<number[]>(
    KEY_AVAILABLE_PLATES,
    {
      defaultValue: [
        Plate55LB, Plate45LB, Plate35LB, Plate25LB,
        Plate15LB, Plate10LB, Plate5LB, Plate2_5LB,
      ],
    },
  );

  const [barbellWeight, setBarbellWeight] = useLocalStorageState<number>(
    KEY_BARBELL_WEIGHT,
    {
      defaultValue: Barbell45LB,
    },
  );

  const [platesConfig, setPlatesConfig] = useState<number[][]>([]);

  const [weight, setWeight] = useState<number>();

  useEffect(() => {
    if (weight) {
      let pConfig = calculatePlates(weight - barbellWeight, availablePlates);
      if (!pConfig) pConfig = [];

      setPlatesConfig(pConfig);
    }
  }, [
    availablePlates,
    barbellWeight,
    onEachSideEnabled,
    weight,
  ]);

  const [totalWeight, setTotalWeight] = useState<number>();

  useEffect(() => {
    if (weight && platesConfig.length > 0) {
      const total = 0;
      setTotalWeight(barbellWeight + platesConfig.reduce(
        (t, pConfig) => t + (pConfig[0] * pConfig[1]),
        total,
      ));
    } else {
      setTotalWeight(undefined);
    }
  }, [
    barbellWeight,
    platesConfig,
  ]);

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
    const value: number = Number(event.target.value);

    if (event.target.checked) {
      updatedList = [...updatedList, value];
    } else {
      updatedList.splice(availablePlates.indexOf(value), 1);
    }

    setAvailablePlates(updatedList.sort((a, b) => b - a));
  };

  return (
    <>
      <Head>
        <title>Plate Calculator</title>
      </Head>

      <div className="min-h-full">
        <header className="pb-24 bg-gray-800">
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
                    <input
                      type="number"
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
                    <div className="relative rounded-md shadow-sm">
                      <label htmlFor="weight" className="block text-sm font-medium text-white">
                        Weight
                        <input
                          type="number"
                          onChange={weightInputHandler}
                          className="bg-white bg-opacity-20 mt-1 py-2 pr-3 border border-transparent rounded-md leading-5  focus:text-gray-600 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 block w-full sm:text-sm"
                          name="weight"
                          id="weight"
                        />
                      </label>
                      <div className="absolute top-8 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="sm:text-sm">
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
                <section>
                  <div className="rounded-lg bg-white overflow-hidden shadow min-h-full pb-3">
                    <div className="flex w-full p-6">
                      <div className="flex">
                        <h3 className="text-3xl py-3 leading-6 font-light text-gray-900">{totalWeight ? `~ ${totalWeight} LB` : ''}</h3>
                      </div>
                      <Switch.Group as="div" className="flex justify-end flex-1 py-3">
                        <Switch
                          checked={onEachSideEnabled}
                          onChange={setOnEachSideEnable}
                          className={classNames(
                            onEachSideEnabled ? 'bg-gray-800' : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
                          )}
                        >
                          <span
                            className={classNames(
                              onEachSideEnabled ? 'translate-x-5' : 'translate-x-0',
                              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                            )}
                          />
                        </Switch>
                        <Switch.Label as="span" className="ml-3">
                          <span className="text-sm font-medium text-gray-900">On Each Side</span>
                        </Switch.Label>
                      </Switch.Group>
                    </div>
                    <div className="p-6">
                      {platesConfig.length > 0
                        ? (
                          <ul className="mt-3 grid grid-cols-2 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-6">
                            {platesConfig.filter((p) => p[1] > 0).map((plate) => (
                              <li key={plate[0]} className="col-span-1 flex shadow-sm rounded-md">
                                <div
                                  className={classNames(
                                    `barbell-${plate[0]}`.replace('.', '_'),
                                    'flex-shrink-0 flex items-center justify-center w-12 text-white text-sm rounded-l-md font-bold',
                                  )}
                                >
                                  {`${plate[0]} LB`}
                                </div>
                                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                  <div className="flex-1 px-4 py-2 text-sm truncate">
                                    <p className="text-gray-500 font-bold">
                                      {onEachSideEnabled ? `${plate[1] / 2} x` : `${plate[1]} x`}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )
                        : (
                          <div className="text-center">
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No weight</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by selection a weight.</p>
                          </div>
                        )}
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="bg-grid grid-cols-1 gap-4">
                <section>
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="px-6 pb-6">
                      <div className="pt-6">
                        <fieldset className="mt-4">
                          <legend className="text-base font-medium text-gray-900">Barbell Weight</legend>
                          <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                            {barbellsList.map((barbell) => (
                              <div key={barbell.id} className="flex items-center">
                                <input
                                  id={`barbell-${barbell.value}`}
                                  name={`barbell-${barbell.value}`}
                                  type="radio"
                                  value={barbell.value}
                                  checked={barbellWeight === barbell.value}
                                  onChange={barbellWeightInputHandler}
                                  className="focus:ring-gray-500 h-4 w-4 text-gray-800 border-gray-300"
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
                        <fieldset className="flex flex-wrap mt-4">
                          <legend className="text-base font-medium text-gray-900">Available Plates</legend>
                          {platesList.map((plate) => (
                            <div key={plate.id} className="relative flex items-start p-2">
                              <div className="flex items-center h-5">
                                <input
                                  id={`plate-${plate.value}`}
                                  name={`plate-${plate.value}`}
                                  value={plate.value}
                                  type="checkbox"
                                  checked={availablePlates.includes(plate.value)}
                                  onChange={platesCheckHandler}
                                  className="focus:ring-gray-500 h-4 w-4 text-gray-800 border-gray-300 rounded"
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
            <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center">
              <span className="block sm:inline">&copy; Rafael Macedo.</span>
              {' '}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
