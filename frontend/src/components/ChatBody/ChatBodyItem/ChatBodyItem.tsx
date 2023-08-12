import React from 'react';
import { Avatar, Box, Card, Stack, Typography } from "@mui/material";

interface Props {
	message: IMessage;
}

const colors = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FFC0CB", "#800080", "#FFA500"];

const ChatBodyItem: React.FC<Props> = ({ message }) => {
	const dateObj = new Date(message.datetime!);
	const now = new Date();

	const timeDifference = now.getTime() - dateObj.getTime();

	const daysPassed: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	const hoursPassed: number = Math.floor(timeDifference / (1000 * 60 * 60));
	const minutesPassed: number = Math.floor(timeDifference / (1000 * 60));
	const secondsPassed: number = Math.floor(timeDifference / 1000);

	const timeResult: string =
		daysPassed > 0 && daysPassed < 30 ? `${daysPassed} дней назад` :
		hoursPassed > 0 && hoursPassed < 24 ? `${hoursPassed} часов назад` :
		minutesPassed > 0 && minutesPassed < 60 ? `${minutesPassed} минут назад` :
		secondsPassed < 4 ? 'только что' : `${secondsPassed} секунд назад`;

	const randomColor = (colors: string[]): string => {
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<Card className="bg-dark rounded-4" sx={{ overflow: 'visible' }}>
			<Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
				<Avatar variant="rounded" />
				<Stack spacing={0.5}>
					<Typography
						sx={{ color: randomColor(colors) }}
						fontSize={22}
						fontWeight={700}
					>
						{ message.author }
					</Typography>
					<Typography className="text-light m-0 p-0" variant="body2">
						{ timeResult }
					</Typography>
				</Stack>
			</Box>
			<hr className="m-0 text-white" />
			<Stack sx={{ m: 2 }} className="text-light">
				{ message.message }
			</Stack>
		</Card>
	);
};
export default ChatBodyItem;