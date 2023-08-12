import React, { useState } from 'react';
import { Box, Button, TextField } from "@mui/material";

interface Props {
	addMessage: (message: IMessage) => void;
	showAlert: (type: string) => void;
}

const ChatForm: React.FC<Props> = ({ addMessage, showAlert }) => {
	const [formData, setFormData] = useState({
		author: '',
		message: ''
	});

	const changeFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const { name, value }: { name: string, value: string } = e.target;

		setFormData(prevState => ({ ...prevState, [name]: value }));
	};

	const onSubmit = (e: React.FormEvent): void => {
		e.preventDefault();

		formData.author.length < 1 ? showAlert('author') :
		formData.message.length < 1 ? showAlert('message') :
			addMessage({ ...formData });
			setFormData(prevState => ({ ...prevState, message: '' }));
	};

	return (
		<Box component="form" onSubmit={onSubmit} display="flex" flexDirection="column" className="bg-dark">
			<TextField
				autoComplete="off"
				label="Author:"
				name="author"
				focused
				inputProps={{ style: { color: 'white' } }}
				value={formData.author}
				onChange={changeFormData}
			/>

			<TextField
				multiline rows={2}
				label="Message:"
				name="message"
				focused
				inputProps={{ style: { color: 'white' } }}
				sx={{ margin: "10px 0" }}
				value={formData.message}
				onChange={changeFormData}
			/>

			<Button type="submit" variant="contained">Send</Button>
		</Box>
	);
};

export default ChatForm;