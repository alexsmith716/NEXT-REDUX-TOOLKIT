import type { NextPage } from 'next';
import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from '../redux/store';
import Button from '../components/Button';
import Loading from '../components/Loading';

import BridgeRatingsCsvGridColumnHeader from '../components/BridgeRatingsCsvGridColumnHeader';
import BridgeRatingsCsvGridRowItems from '../components/BridgeRatingsCsvGridRowItems';
import { fetchData } from '../utils/fetchAPI';
import { TodosType, FibonacciType, NycCountyType, } from '../types';
import { addCurrencyCommas } from '../utils/addCurrencyCommas';

import { fetchBridgeRatingsReplacementCost, bridgeRatingsReplacementCostSliceData, } from '../redux/slices/bridgeRatingsReplacementCostSlice';
import { fetchBridgeRatingsFull, bridgeRatingsFullSliceData, } from '../redux/slices/bridgeRatingsFullSlice';
import { fetchBridgeRatings, bridgeRatingsSliceData, } from '../redux/slices/bridgeRatingsSlice';

import { BridgeRatingsFullSliceData } from '../redux/slices/bridgeRatingsFullSlice';

interface PythonAPIProps {
	documentTitle?: string;
};

const PythonAPI: NextPage<PythonAPIProps> = ({ documentTitle }) => {

	useEffect(() => {
		setTitle(documentTitle+':\u0020pyapi');
	}, [documentTitle]);

	const [title, setTitle] = useState("");
	const dispatch = useAppDispatch();

	const [todosLoading, setTodosLoading] = useState(false);
	const [fibonacciLoading, setFibonacciLoading] = useState(false);
	const [nycCountyLoading, setNycCountyLoading] = useState(false);

	const [todos, setTodos] = useState<TodosType>();
	const [fibonacci, setFibonacci] = useState<FibonacciType>();
	const [nycCounty, setNycCounty] = useState<NycCountyType>();

	const bridgeRatingsReplacementCostData = useAppSelector(bridgeRatingsReplacementCostSliceData);
	const bridgeRatingsFullData = useAppSelector(bridgeRatingsFullSliceData);
	const bridgeRatingsData = useAppSelector(bridgeRatingsSliceData);

	function dispatchLoadBridgeRatingsReplacementCost() {
		if(!bridgeRatingsReplacementCostData.loading && !bridgeRatingsReplacementCostData.data) {
			dispatch(fetchBridgeRatingsReplacementCost())
		}
	};
	
	function dispatchLoadBridgeRatingsFull() {
		if(!bridgeRatingsFullData.loading && !bridgeRatingsFullData.data) {
			dispatch(fetchBridgeRatingsFull())
		}
	};

	function dispatchLoadBridgeRatings() {
		if(!bridgeRatingsData.loading && !bridgeRatingsData.data) {
			dispatch(fetchBridgeRatings())
		}
	};

	function createBridgeRatingsFull(reponse: BridgeRatingsFullSliceData) {
		return reponse.data;
	};

	const createBRatingsFull = useMemo(() => createBridgeRatingsFull(bridgeRatingsFullData), [bridgeRatingsFullData]);
	const bridgeRCGColumnHeader = useMemo(() => BridgeRatingsCsvGridColumnHeader(bridgeRatingsData), [bridgeRatingsData]);
	const bridgeRCGRowItems = useMemo(() => BridgeRatingsCsvGridRowItems(bridgeRatingsData), [bridgeRatingsData]);

	useEffect(() => {
		if(todos) {
			setTodosLoading(false)
		}
		if(fibonacci) {
			setFibonacciLoading(false)
		}
		if(nycCounty) {
			setNycCountyLoading(false)
		}
	}, [ todos, fibonacci, nycCounty, ]);

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>

			<div className="container">
				{/* ---------------------------------------------- */}

				<h1 className="mt-4 mb-3">Python API</h1>

				{/* ---------------------------------------------- */}

				<div className="bg-color-ivory container-padding-border-radius-1 overflow-wrap-break-word mb-5">

					{/* ============================================== */}

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-primary btn-md ${todosLoading ? 'disabled' : ''}`}
							onClick={() => {
								setTodosLoading(true)
								fetchData('todosapi/todos')
									.then(data => {
										setTodos(data);
									})
									.catch(() => {
										setTodos({ 'error': 'Error when attempting to fetch resource.' })
									})
							}}
							buttonText="Get The Todos"
						/>

						{todosLoading && (
							<div className="mt-1 ml-2">
								<Loading text="Loading" />
							</div>
						)}

						{!todosLoading && (
							<>
								{todos && todos.error && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											Error when attempting to fetch resource.
										</div>
									</div>
								)}

								{todos && todos.data && (
									<div className="mt-1 ml-2 container-padding-border-1 width-fit-content">
										<pre>
											{JSON.stringify(todos.data)}
										</pre>
									</div>
								)}
							</>
						)}
					</div>

					{/* ============================================== */}

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-primary btn-md ${fibonacciLoading ? 'disabled' : ''}`}
							onClick={() => {
								setFibonacciLoading(true)
								fetchData('fibonacci', '200')
									.then(data => {
										setFibonacci(data);
									})
									.catch(() => {
										setFibonacci({ 'error': 'Error when attempting to fetch resource.' })
									})
							}}
							buttonText="Get Fibonacci Length 200"
						/>
						{fibonacciLoading && (
							<div className="mt-1 ml-2">
								<Loading text="Loading" />
							</div>
						)}

						{!fibonacciLoading && (
							<>
								{fibonacci && fibonacci.error && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											Error when attempting to fetch resource.
										</div>
									</div>
								)}

								{fibonacci && fibonacci.data && (
									<div className="mt-1 ml-2 container-padding-border-1 width-fit-content">
										<pre>
											{fibonacci.data.join(' ')}
										</pre>
									</div>
								)}
							</>
						)}
					</div>

					{/* ============================================== */}

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-primary btn-md ${nycCountyLoading ? 'disabled' : ''}`}
							onClick={() => {
								setNycCountyLoading(true)
								fetchData('nyccounty', '1')
									.then(data => {
										setNycCounty(data);
									})
									.catch(() => {
										setNycCounty({ 'error': 'Error when attempting to fetch resource.' })
									})
							}}
							buttonText="Get NYC County"
						/>
						{nycCountyLoading && (
							<div className="mt-1 ml-2">
								<Loading text="Loading" />
							</div>
						)}

						{!nycCountyLoading && (
							<>
								{nycCounty && nycCounty.error && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											Error when attempting to fetch resource.
										</div>
									</div>
								)}

								{nycCounty && nycCounty.data && (
									<div className="mt-1 ml-2 container-padding-border-1 width-fit-content">
										<pre>
											{nycCounty.data}
										</pre>
									</div>
								)}
							</>
						)}
					</div>

					{/* ============================================== */}

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-primary btn-md ${(bridgeRatingsReplacementCostData.loading || bridgeRatingsReplacementCostData.data) ? 'disabled' : ''}`}
							onClick={() => {
								dispatchLoadBridgeRatingsReplacementCost()
							}}
							buttonText="Get Brooklyn's Bridges Replacement Cost"
						/>
						{bridgeRatingsReplacementCostData.loading && (
							<div className="mt-1 ml-2">
								<Loading text="Loading" />
							</div>
						)}

						{!bridgeRatingsReplacementCostData.loading && (
							<>
								{!bridgeRatingsReplacementCostData.data && bridgeRatingsReplacementCostData.error && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											Error when attempting to fetch resource.
										</div>
									</div>
								)}

								{bridgeRatingsReplacementCostData.data && !bridgeRatingsReplacementCostData.error && (
									<div className="mt-1 ml-2 container-padding-border-1 width-fit-content">
										<pre>
											${addCurrencyCommas(bridgeRatingsReplacementCostData.data)}
										</pre>
									</div>
								)}
							</>
						)}
					</div>

					{/* ============================================== */}

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-primary btn-md ${(bridgeRatingsFullData.loading || bridgeRatingsFullData.data) ? 'disabled' : ''}`}
							onClick={() => {
								dispatchLoadBridgeRatingsFull()
							}}
							buttonText="Get Full Bridge Ratings"
						/>
						{bridgeRatingsFullData.loading && (
							<div className="mt-1 ml-2">
								<Loading text="Loading" />
							</div>
						)}

						{!bridgeRatingsFullData.loading && (
							<>
								{!bridgeRatingsFullData.data && bridgeRatingsFullData.error && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											{/* {bridgeRatingsFullData.error} */}
											Error when attempting to fetch resource.
										</div>
									</div>
								)}

								{bridgeRatingsFullData.data && !bridgeRatingsFullData.error && (
									<div className="mt-1 ml-2 container-padding-border-1 container-overflow-height-small">
										<pre>
											{createBRatingsFull}
										</pre>
									</div>
								)}
							</>
						)}
					</div>

					{/* ============================================== */}

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-primary btn-md ${(bridgeRatingsData.loading || bridgeRatingsData.data) ? 'disabled' : ''}`}
							onClick={() => {
								dispatchLoadBridgeRatings()
							}}
							buttonText="Get Bridge Ratings"
						/>
						{bridgeRatingsData.loading && (
							<div className="mt-1 ml-2">
								<Loading text="Loading" />
							</div>
						)}

						{!bridgeRatingsData.loading && (
							<>
								{!bridgeRatingsData.data && bridgeRatingsData.error && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											{/* {bridgeRatingsData.error} */}
											Error when attempting to fetch resource.
										</div>
									</div>
								)}

								{bridgeRatingsData.data && !bridgeRatingsData.error && (
									<div className="mt-1 ml-2 container-border-1-radius-1 container-overflow-height-small">
										<div>
											<div className="table-bridge-ratings-wrapper">
												<div className="table-bridge-ratings-csv-repeat-6 table-bridge-ratings-display">
													{bridgeRCGColumnHeader}
													{bridgeRCGRowItems}
												</div>
											</div>
										</div>
									</div>
								)}
							</>
						)}
					</div>

				</div>
			</div>
		</>
	);
};

export default PythonAPI;
