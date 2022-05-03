import { useEffect, useState } from "react";
import { AppLayout } from "../layouts/AppLayout";

import {Card ,CardContent ,Typography, Grid} from "@mui/material";
const host = "http://api.weatherapi.com/v1";
const country = "Israel";

const Weather = (): JSX.Element => {
	const [weather, setWeather] = useState<Array<string>>([]);

	const getWeather = async () => {
		const response = await fetch(
			`${host}/forecast.json?key=8903aea7c47544eb91f105105220205&q=${country}&days=5&aqi=no&alerts=no`
		);
		const jsonData = await response.json();
		setWeather(jsonData.forecast.forecastday);
	};

	useEffect(() => {
		getWeather();
	}, []);


  const determineColour = (c: number) => {
    return c > 30 ? "#FF3131" : "#89CFF0";
  }

	return (
		<AppLayout>
			{
				<div>
					<Typography variant="h3">Weather for {country}</Typography>
					<Grid container spacing={2}>
						{weather.map((item: any) => {
							return (
								<Grid item xs={3} key={item.date}>
									<Card sx={{ width: "100%" }}>
										<CardContent
											sx={{
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
											}}
										>
											<Typography>{item.date}</Typography>
											<img src={item.day.condition.icon} />
											<Typography
												sx={{
													backgroundColor: determineColour(item.day.maxtemp_c),
													width: "100%",
													textAlign: "center",
												}}
											>
												{item.day.maxtemp_c}
											</Typography>
											<Typography
												sx={{
													backgroundColor: determineColour(item.day.mintemp_c),
													width: "100%",
													textAlign: "center",
												}}
											>
												{item.day.mintemp_c}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							);
						})}
					</Grid>
				</div>
			}
		</AppLayout>
	);
};

export { Weather };
