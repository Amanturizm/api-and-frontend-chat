import React, { useEffect, useRef } from 'react';
import { Container } from "@mui/material";
import ChatBodyItem from "./ChatBodyItem/ChatBodyItem";
import './ChatBodyScrollBar.css';
import '../../Preloader.css';

interface Props {
	messages: IMessage[];
	isPreloader: boolean;
}

const ChatBody: React.FC<Props> = ({ messages, isPreloader }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (containerRef.current) {
			const containerElement: HTMLDivElement = containerRef.current;
			containerElement.scrollTop = containerElement.scrollHeight;
		}
	}, [messages]);

	const chatBodyStyles = {
		height: 300,
		background: "url('https://c4.wallpaperflare.com/wallpaper/792/639/808/pattern-monochrome-telegram-logo-cats-hd-wallpaper-preview.jpg') no-repeat",
		backgroundSize: 'cover',
	};

	return (
		<div id="chat-body" className="position-relative">
			{isPreloader ? (
				<div id="preloader">
					<div id="loader"></div>
				</div>
			) : null}
			<Container
				ref={containerRef}
				sx={ chatBodyStyles }
				className="overflow-y-scroll d-flex flex-column gap-3 rounded p-3 mb-3"
			>
				{messages.map((message) => (
					<ChatBodyItem key={message.id} message={message} />
				))}
			</Container>
		</div>
	);
};

export default React.memo(ChatBody);