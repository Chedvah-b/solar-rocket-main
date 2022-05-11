import { useEffect, useState } from "react";
import { AppLayout } from "../layouts/AppLayout";

import {Card ,CardContent ,Typography, Grid, Container} from "@mui/material";
import { HourlyDisplay } from "./hourlyDisplay";

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

	const dateToDay = (dateString: any) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-us', {weekday: 'long'})
	}

  const determineColour = (c: number) => {
    return c > 30
			? `rgba(${c * 100 + (50 % 255)},0,0,${
					((c - 30) / (35 - 30)) * (0.8 - 0.1) + 0.1
			  })`
			: `rgba(${c * 3.6},${c * 6},${c * 150},${
					((c - 15) / (22 - 15)) * (0.8 - 0.1) + 0.1
			  })`;//"#FF3131" : "#89CFF0";
  }
	
  
	return (
		<AppLayout title="Weather">
			
			<Container maxWidth="lg">
				<Typography variant="h3" sx={{mb: '10px'}}>Weather for {country}</Typography>
				<Grid container spacing={2}>
					{weather.map((item: any) => {
						return (
							<Grid item xs={3} key={item.date}>
								<Card sx={{ width: "100%" }} >
									<CardContent
										sx={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<Typography>{dateToDay(item.date)}</Typography>
										<img src={item.day.condition.icon} alt="" />
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
										<HourlyDisplay hours={item.hour} key={item.date} />
									</CardContent>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
			
		</AppLayout>
	);
};

export { Weather };
