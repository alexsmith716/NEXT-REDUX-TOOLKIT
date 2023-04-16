import type { NextPage } from 'next';
import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from '../redux/store';
import Button from '../components/Button';
import Loading from '../components/Loading';

import BridgeRatingsCsvGridColumnHeader from '../components/BridgeRatingsCsvGridColumnHeader';
import BridgeRatingsCsvGridRowItems from '../components/BridgeRatingsCsvGridRowItems';
import {
	fetchBridgeRatings,
	bridgeRatingsSliceData,
} from '../redux/slices/bridgeRatingsSlice';

interface PythonAPIProps {
	documentTitle?: string;
};

const PythonAPI: NextPage<PythonAPIProps> = ({ documentTitle }) => {

	useEffect(() => {
		setTitle(documentTitle+':\u0020pyapi');
	}, [documentTitle]);

	const [title, setTitle] = useState("");
	const dispatch = useAppDispatch();

	const bridgeRatingsData = useAppSelector(bridgeRatingsSliceData);

	function dispatchLoadBridgeRatings() {
		dispatch(fetchBridgeRatings())
	};

	const bridgeRCGColumnHeader = useMemo(() => BridgeRatingsCsvGridColumnHeader(bridgeRatingsData), [bridgeRatingsData]);
	const bridgeRCGRowItems = useMemo(() => BridgeRatingsCsvGridRowItems(bridgeRatingsData), [bridgeRatingsData]);

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
							className={`btn-primary btn-md ${bridgeRatingsData?.data ? 'disabled' : ''}`}
							onClick={() => {
								dispatchLoadBridgeRatings()
							}}
							buttonText="Get Bridge Ratings"
						/>
						{bridgeRatingsData?.loading && (
							<div className="mt-1 ml-2">
								<Loading text="Loading" />
							</div>
						)}

						{!bridgeRatingsData?.loading && (
							<>
								{!bridgeRatingsData?.data && bridgeRatingsData?.error && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											Error when attempting to fetch resource.
										</div>
									</div>
								)}

								{bridgeRatingsData?.data && !bridgeRatingsData?.error && (
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

					{/* ============================================== */}

				</div>
			</div>
		</>
	);
};

export default PythonAPI;
