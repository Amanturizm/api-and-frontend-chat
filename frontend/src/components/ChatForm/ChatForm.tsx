import React, { useState } from 'react';
import { Button, FormControl, FormLabel, TextareaAutosize } from "@mui/material";

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
		<form onSubmit={onSubmit}>
			<FormControl className="w-100">
				<FormLabel htmlFor="my-input" className="text-light">Author:</FormLabel>
				<input
					type="text"
					className="form-control mb-4"
					id="my-input"
					name="author"
					value={formData.author}
					onChange={changeFormData}
				/>

				<FormLabel htmlFor="my-input" className="text-light">Message:</FormLabel>
				<TextareaAutosize
					className="form-control mb-4"
					id="my-input"
					name="message"
					value={formData.message}
					onChange={changeFormData}
				/>

				<Button type="submit" variant="contained">Send</Button>
			</FormControl>
		</form>
	);
};

export default ChatForm;