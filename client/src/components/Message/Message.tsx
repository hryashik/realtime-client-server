import React from "react";

type Message = {
	id: number
	username: string
	body: string
}
type Props = {
	msg: Message
	username: string
}

const Message: React.FC<Props> = ({msg, username}) => {
	function calcStyle(name: string) {
		if (username === name) {
			return 'msg myMsg'
		} else {
			return 'msg otherMsg'
		}
	}

	return (
		<div className={'message-card'} key={msg.id}>
			<p className={calcStyle(msg.username)}>
				{msg.body}
			</p>
			{msg.username === username ? '' : <span className={'message-card__username'}>{msg.username}</span>}
		</div>
	)
}
export default Message
