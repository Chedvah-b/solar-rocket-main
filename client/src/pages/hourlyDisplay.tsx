import { Button, Dialog, DialogContent, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";

export interface SimpleDialogProps {
    hours: Array<string>;
    key: string;
}

const HourlyDisplay = (props: SimpleDialogProps): JSX.Element => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

  

    return (
			<div>
				<Button
					sx={{ mt: "10px", fontWeight: "bold" }}
					variant="text"
					onClick={handleClickOpen}
				>
					View hourly display
				</Button>
				<Dialog open={open} onClose={handleClose}>
					<DialogContent>
						<Table
							sx={{ minWidth: "100%" }}
							aria-label="simple table"
							stickyHeader
						>
							<TableHead>
								<TableRow key={props.key}>
									<TableCell key={props.key}>Time</TableCell>
									<TableCell align="right">Temp C</TableCell>
									<TableCell align="right">Condition</TableCell>
									<TableCell align="right"></TableCell>
									<TableCell align="right">Chance of rain</TableCell>
									<TableCell align="right">Wind degree</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{props.hours.map((row: any) => (
									<TableRow
										key={props.key}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{row.time.slice(-5)}
										</TableCell>
										<TableCell align="right">{row.temp_c}</TableCell>

										<TableCell align="right">{row.condition.text}</TableCell>
										<TableCell align="right">
											<img src={row.condition.icon} alt="" />
										</TableCell>
										<TableCell align="right">{row.chance_of_rain}</TableCell>
										<TableCell align="right">{row.wind_degree}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</DialogContent>
				</Dialog>
			</div>
		);
};

export {HourlyDisplay}